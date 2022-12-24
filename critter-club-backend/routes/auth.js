const jsonschema = require("jsonschema");
const express = require("express");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../utils/tokens");
const newUserSchema = require("../schemas/newUserSchema.json");
const userSchema = require("../schemas/userSchema.json");
const router = express.Router();


// adds new user to db if valid username, password and access code are submitted; returns token for authentication
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

router.post("/login", async function (req, res, next) {
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

module.exports = router;