const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const token = req.cookies?.token;
  req.user = null;

  if (token) {
    const user = getUser(token);
    if (user) req.user = user;
  }

  next();
}

function restrictTo(roles = ["Normal"]) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role))
      return res.status(403).send("Unauthorized");

    next();
  };
}

module.exports = { checkForAuthentication, restrictTo };
