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

const postCharacter = async (data = [], options = {}) => {
  const agent = request(app).post("/api/add-characters");
  if (options.cookies) {
    agent.set("Cookie", [`${cookieName}=${options.cookies}`]);
  }
  return agent.send(data);
};

describe("Post Characters", () => {
  const validData = { characters: ["1", "2", "3"] };
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
