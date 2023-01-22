"use strict";

const express = require("express");
const { ensureLoggedIn, ensureCorrectUser } = require("../utils/middleware");
const User = require("../models/user");
const router = express.Router();

/** get data for a registered, logged-in user */
router.get("/:username", ensureLoggedIn, ensureCorrectUser, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user })
    }
    catch(err) {
        return next(err);
    }
});

/** add points to user in db as they answer questions correctly */
router.patch("/points", async function (req, res, next) {
  try {
      const user = await User.updatePoints(req.body.username, req.body.points);
      return res.json({ user })
  }
  catch(err) {
      return next(err);
  }
});


/** reset user points to zero in db if they choose to start over */
router.patch("/reset", async function (req, res, next) {
  try {
    const user = await User.resetPoints(req.body.username);
    return res.json({ user });
  }
  catch(err) {
    return next(err);
  }
});

/** add new entry to user's list of badges */
router.post("/badges", async function (req, res, next) {
  try {
      const badge = await User.addBadge(req.body.animalId, req.body.userId);
      return res.json({ badge })
  }
  catch(err) {
    return next(err);
  }
});

/** delete all user's badges if they choose to start over */
router.delete("/badges/:userId", async function (req, res, next) {
  try {
    await User.deleteBadges(req.params.userId);
    return res.json({ deleted: req.params.userId })
  }
  catch(err) {
    return next(err);
  }
})

module.exports = router;