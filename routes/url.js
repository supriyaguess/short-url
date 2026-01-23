const express = require("express");
const { handleGenerateNewShortURL, handleGetAnalytics } = require("../controllers/url");
const { restrictTo } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/",
  restrictTo(["Normal", "ADMIN"]),
  handleGenerateNewShortURL
);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
