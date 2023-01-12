"use strict";

const express = require("express");
const Animal = require("../models/animal.js");
const router = express.Router();

router.get("/animal/:animalId", async function (req, res, next) {
    try {
        const animal = await Animal.getById(req.params.animalId);
        return res.json({ animal });
    }
    catch (err) {
        return next(err);
    }
});

router.get("/:animalName", async function (req, res, next) {
    try {
        const animal = await Animal.get(req.params.animalName);
        return res.json({ animal });
    }
    catch (err) {
        return next(err);
    }
});

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