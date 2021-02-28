const request = require("supertest");

const app = require("../src/app");
const sequelize = require("../src/config/database");
const Characters = require("../src/character/Character");
const { cookieName } = require("../src/utils/Cookies");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  await Characters.destroy({ truncate: true });
});

const validData = { characters: ["1", "2", "3"] };

const postCharacter = async (data = [], options = {}) => {
  const agent = request(app).post("/api/add-characters");
  if (options.cookies) {
    agent.set("Cookie", [`${cookieName}=${options.cookies}`]);
  }
  return agent.send(data);
};

const getCharacters = async (userId) => {
  return await request(app).get(`/api/fav-chars/${userId}`);
};

describe("Post Characters", () => {
  it("returns 400 Bad Request when data is not provided", async () => {
    const response = await postCharacter();
    expect(response.status).toBe(400);
  });

  it("adds favourite characters to db", async () => {
    await postCharacter(validData);
    const chars = await Characters.findAll();
    expect(chars.length).toBe(1);
  });

  it("updates favourite characters when cookie was sent with request", async () => {
    const userId = "123";
    await Characters.create({
      userId: userId,
      charIds: validData.characters.join(","),
    });

    const reversedData = validData.characters.reverse();
    const updatedData = { characters: reversedData };

    await postCharacter(updatedData, { cookies: userId });
    const character = await Characters.findOne({ where: { userId: userId } });
    expect(character.charIds).toEqual(reversedData.join(","));
  });
});

describe("Get Characters", () => {
  it("returns status 400 if incorrect userId provided", async () => {
    const userId = "123";
    await Characters.create({
      userId: userId,
      charIds: validData.characters.join(","),
    });

    const response = await getCharacters(userId[0]);
    expect(response.status).toBe(400);
  });

  it("returns chosen characters if correct userId provided", async () => {
    const userId = "123";
    const charIds = validData.characters.join(",");
    await Characters.create({
      userId: userId,
      charIds: charIds,
    });

    const response = await getCharacters(userId);
    expect(response.body.results).toEqual(charIds);
  });
});
