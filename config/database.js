const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config(); // Load .env variables

const sequelize = new Sequelize(
  process.env.DB_NAME || "userdatabase",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "Thaw@#245",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });

module.exports = sequelize;
