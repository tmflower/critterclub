"use strict";

// const axios = require("axios");

const express = require("express");
const cors = require("cors");
const { API_KEY_ANIMALS, API_KEY_PHOTOS } = require("./config");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/keys", (req, res) => {
    // res.json({key: `${apiKEY}`})
    // return res.send(`${API_KEY_ANIMALS}`);
    res.json({
        animals_api_key: API_KEY_ANIMALS,
        photos_api_key: API_KEY_PHOTOS})
});



// app.get('/data', async (req, res) => {
// const response = await axios.get(apiKEY)
// const data = response.json()
// res.json({data})
// })

module.exports = app;