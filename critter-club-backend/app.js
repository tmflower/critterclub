"use strict";

const express = require("express");
const cors = require("cors");
const { API_KEY_ANIMALS, API_KEY_PHOTOS } = require("./config");
const MEDIA = require("./utils/media");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/keys", (req, res) => {
    res.json({
        animals_api_key: API_KEY_ANIMALS,
        photos_api_key: API_KEY_PHOTOS})
});

app.get("/media", (req, res) => { 
    console.log(res.json({media: MEDIA}))  
    res.json({media: MEDIA});
})

module.exports = app;