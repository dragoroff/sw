const Sequalize = require("sequelize");
const { Model } = require("sequelize");
const sequelize = require("../config/database");

class Characters extends Model {}

Characters.init(
  {
    charIds: {
      type: Sequalize.STRING,
    },
    userId: {
      type: Sequalize.STRING,
    },
  },
  {
    sequelize,
    modelName: "characters",
  }
);

module.exports = Characters;
