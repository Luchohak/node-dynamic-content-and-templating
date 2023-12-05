"use strict";

var Sequelize = require("sequelize");

var sequelize = new Sequelize("node-complete", "root", "simonsimon", {
  dialect: "mysql",
  host: "localhost"
});
module.exports = sequelize;