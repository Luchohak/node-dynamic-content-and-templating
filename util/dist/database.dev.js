"use strict";

var mysql = require('mysql2');

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-complete',
  password: 'simonsimon'
});
module.exports = pool.promise();