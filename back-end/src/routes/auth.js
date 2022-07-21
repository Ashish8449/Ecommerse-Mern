const express = require("express");
const { signup, signin, requireSignin } = require("../controller/auth");

const User = require("../models/user.js");

const router = express.Router();
router.post("/signin", signin);
router.post("/signup", signup);
router.get("/profile", requireSignin, (req, res) => {
  res.status(200).json({
    user: "user",
  });
});

module.exports = router;
