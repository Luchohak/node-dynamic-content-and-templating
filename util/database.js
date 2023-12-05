const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "simonsimon", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
