"use strict";

const express = require("express");
const router = express.Router();

const { API_KEY_ANIMALS, API_KEY_PHOTOS } = require("../config");
const MEDIA = require("../utils/media");

router.get("/keys", (req, res) => {
    res.json({
        animals_api_key: API_KEY_ANIMALS,
        photos_api_key: API_KEY_PHOTOS})
});

router.get("/media", (req, res) => { 
    console.log(res.json({media: MEDIA}))  
    res.json({media: MEDIA});
});

module.exports = router;