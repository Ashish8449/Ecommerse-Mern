const express = require("express");
const router = express.Router();
const { signup, signin, requireSignin } = require("../controller/auth");
const User = require("../models/user.js");

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/profile",requireSignin, (req, res) => {
  res.status(200).json({
    user: "user",
  });
});

module.exports = router;
