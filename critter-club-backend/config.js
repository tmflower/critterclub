"use strict";

require("dotenv").config();
require("colors");

const API_KEY_ANIMALS = process.env.API_KEY_ANIMALS;
const API_KEY_PHOTOS = process.env.API_KEY_PHOTOS;
const PORT = +process.env.PORT || 3001;

function getDatabaseUri() {
    return "critter-club";
}

console.log("Config:".green);
console.log("API_KEY_ANIMALS:".yellow, API_KEY_ANIMALS);
console.log("API_KEY_PHOTOS:".yellow, API_KEY_PHOTOS);
console.log("PORT:".yellow, PORT.toString());
console.log("Database:".yellow, getDatabaseUri());

module.exports = {
    API_KEY_ANIMALS,
    API_KEY_PHOTOS,
    PORT
}