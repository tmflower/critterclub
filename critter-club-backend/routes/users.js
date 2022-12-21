"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const { ensureLoggedIn, ensureCorrectUser } = require("../utils/middleware");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../utils/tokens");
const newUserSchema = require("../schemas/newUserSchema.json");
const userSchema = require("../schemas/userSchema.json");
const router = express.Router();

router.post("/register", async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, newUserSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
      const newUser = await User.register(req.body);
      const token = createToken(newUser);
      return res.status(201).json({ token });
    } catch (err) {
      return next(err);
    }
  });

router.post("/authenticate", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const user = await User.authenticate(req.body.username, req.body.password);
    const token = createToken(user);
    return res.json({ token });
  }
  catch(err) {
    return next(err);
  }
});

// router.get("/:username", ensureLoggedIn, ensureCorrectUser, async function (req, res, next) {
//     try {
//         const user = await User.get(req.params.username);
//         return res.json({ user })
//     }
//     catch(err) {
//         return next(err);
//     }
// });

module.exports = router;