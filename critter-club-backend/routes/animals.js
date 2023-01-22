"use strict";

const express = require("express");
const Animal = require("../models/animal.js");
const router = express.Router();

/** get the name and photo for an animal when given its id number */
router.get("/animal/:animalId", async function (req, res, next) {
    try {
        const animal = await Animal.getById(req.params.animalId);
        return res.json({ animal });
    }
    catch (err) {
        return next(err);
    }
});

/** get the id number and photo for an animal when given its name */
router.get("/:animalName", async function (req, res, next) {
    try {
        const animal = await Animal.get(req.params.animalName);
        return res.json({ animal });
    }
    catch (err) {
        return next(err);
    }
});

/** get a list of all the animals in the db
 * each entry contains the id number, animal name, and path to image for creating user badges
 */
router.get("/", async function (req, res, next) {
    try {
        const animals = await Animal.getAllAnimals();
        return res.json({ animals });
    }
    catch(err) {
        return next(err);
    }
});

module.exports = router;