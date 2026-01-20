const { getUser } = require('../service/auth');

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");

  const user = getUser(userUid);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  if (userUid) {
    const user = getUser(userUid);
    req.user = user;
  } else {
    req.user = null;
  }

  next(); //  REQUIRED
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
