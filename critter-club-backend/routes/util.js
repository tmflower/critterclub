"use strict";

const express = require("express");
const router = express.Router();

const { API_KEY_ANIMALS, API_KEY_PHOTOS } = require("../config");
const MEDIA = require("../utils/media");

/** provides access to keys needed for youtube and unsplash APIs */
router.get("/keys", (req, res) => {
    res.json({
        animals_api_key: API_KEY_ANIMALS,
        photos_api_key: API_KEY_PHOTOS})
});

/** provides access to codes needed for API requests to youtube and unsplash */
router.get("/media", (req, res) => { 
    res.json({media: MEDIA});
});

module.exports = router;