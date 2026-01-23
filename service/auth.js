const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET
  );
}

function getUser(token) {
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

module.exports = { setUser, getUser };
