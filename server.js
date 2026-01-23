const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");

const { checkForAuthentication, restrictTo } = require("./middleware/auth");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();

// Connect using env var (Atlas URI on Vercel)
connectToMongoDB(process.env.MONGODB_URL)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.error("Mongo connect error:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", checkForAuthentication);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRouter);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true }
  );

  if (!entry) return res.status(404).send("Short URL not found");
  return res.redirect(entry.redirectURL);
});

// Vercel needs the handler export (NO app.listen here)
module.exports = app;