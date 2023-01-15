"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const { BadRequestError } = require("../expressError");
const Parent = require("../models/parent");
const { createToken } = require("../utils/tokens");
const parentSchema = require("../schemas/parentSchema.json");
const router = express.Router();

router.post("/register", async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, parentSchema);
      if (!validator.valid) { console.log("******************VALIDATION ERROR")
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
      const parent = await Parent.register(req.body);
      const token = createToken(parent);
      return res.status(201).json({ token });
    } catch (err) { 
      if (err.message.includes("email")) {
        err.message = "Please enter a valid email address"
      }
      console.log("ERROR IS HERE!!**************************", err)
      return next(err);
    }
  });

  router.get("/:username", async function (req, res, next) {
    try {
        const parent = await Parent.get(req.params.username);
        return res.json({ parent })
    }
    catch(err) {
        return next(err);
    }
});

  module.exports = router;