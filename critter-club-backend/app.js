"use strict";

const express = require("express");
const cors = require("cors");
const { API_KEY_ANIMALS, API_KEY_PHOTOS } = require("./config");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/keys", (req, res) => {
    res.json({
        animals_api_key: API_KEY_ANIMALS,
        photos_api_key: API_KEY_PHOTOS})
});

app.get("/media", (req, res) => {
    res.json({
        "African palm civet": {
            "image": "5hJEoKHRh8w",
            "video": "5hJEoKHRh8w"
        },
        "Leopard": {
            "image": "3TwThGdEUZA",
            "video": "3TwThGdEUZA"
        },
        "Cheetah": {
            "image": "bcJUbYd5gTo",
            "video": "bcJUbYd5gTo"
        },
    })
})

module.exports = app;