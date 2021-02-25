const { v4: uuidv4 } = require("uuid");
const Sequalize = require("sequelize");

const Characters = require("./Character");

const save = async (chars) => {
  const userId = uuidv4();

  // sqlite doesn't provide functionality to save arrays
  // that's why I need to convert all ids to string
  const charIds = chars.join(",");

  const favCharacters = {
    userId,
    charIds,
  };

  await Characters.create(favCharacters);

  return userId;
};

const update = async (characters, userId) => {
  const chars = await Characters.findOne({ where: { userId: userId } });
  const charIds = characters.join(",");

  chars.charIds = charIds;
  await chars.save();
};

module.exports = { save, update };
