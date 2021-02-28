const app = require("./src/app");
const sequelize = require("./src/config/database");

sequelize.sync();

app.listen(8000, () => console.log("App is Live on 8000"));
