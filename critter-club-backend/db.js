"use strict";

const { Client } = require("pg");
const { get } = require("./app");
const { getDatabaseUri } = require("./config");

let db = new Client({
    connectionString: getDatabaseUri()
});

db.connect();

module.exports = db;