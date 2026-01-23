const express = require("express");
const { handleUserLogin, handleUserSignup } = require("../controllers/user");

const router = express.Router();

router.post("/login", handleUserLogin);
router.post("/signup", handleUserSignup);

module.exports = router;
