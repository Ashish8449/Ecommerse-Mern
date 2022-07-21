const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  requireSignin,
} = require("../../controller/admin/auth");
const User = require("../../models/user");

router.post("/admin/signin", signin);
router.post("/admin/signup", signup);

module.exports = router;
