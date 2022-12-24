"use strict";

const express = require("express");
const { ensureLoggedIn, ensureCorrectUser } = require("../utils/middleware");
const User = require("../models/user");
const router = express.Router();

router.get("/:username", ensureLoggedIn, ensureCorrectUser, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        console.log("*********************************USER:", user)
        return res.json({ user })
    }
    catch(err) {
        return next(err);
    }
});

router.patch("/points", async function (req, res, next) {
  try {
      const user = await User.updatePoints(req.body.username, req.body.points);
      console.log("***********************************REQ.BODY", req.body)
      return res.json({ user })
  }
  catch(err) {
      return next(err);
  }
});

router.post("/badges", async function (req, res, next) {
  try {
      const badge = await User.addBadge(req.body.animalId, req.body.userId);
      console.log("***********************************REQ.BODY", req.body.animalId, req.body.userId);
      return res.json({ badge })
  }
  catch(err) {
    return next(err);
  }
});

module.exports = router;