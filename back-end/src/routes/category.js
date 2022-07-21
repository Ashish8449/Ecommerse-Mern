const express = require("express");
const router = express.Router();
const { createCategory } = require("../controller/category");

router.post("/category/create", createCategory);
router.get("/category/", createCategory);

module.exports = router;
