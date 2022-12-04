"use strict";

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/dogs", function(req, res) {
    return res.send("Dogs go bark bark");
});

module.exports = app;