"use strict";

require("dotenv").config();
require("colors");

const API_KEY_ANIMALS = process.env.API_KEY_ANIMALS;
const API_KEY_PHOTOS = process.env.API_KEY_PHOTOS;
const PORT = +process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY || "animals";
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
    ? "critterclub_test"
    : process.env.DATABASE_URL || "critterclub";
}

console.log("Config:".green);
console.log("API_KEY_ANIMALS:".yellow, API_KEY_ANIMALS);
console.log("API_KEY_PHOTOS:".yellow, API_KEY_PHOTOS);
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("PORT:".yellow, PORT.toString());
console.log("Database:".yellow, getDatabaseUri());

module.exports = {
    API_KEY_ANIMALS,
    API_KEY_PHOTOS,
    PORT,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri
}