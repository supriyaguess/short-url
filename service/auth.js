//const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "Supriya$123@$";

function setUser(user) { //--> this function make topken for stateless

    return jwt.sign(
        {
        _id: user._id,
        email: user.email,
        role: user.role,
        },
        secret
    );
}

/* function setUser(id,user) {
    sessionIdToUserMap.set(id,user);
} */

function getUser(token) {
    if(!token) return null;
    try {
        return jwt.verify(token, secret);    
    } catch (error) {
         return null;
    }
}
module.exports = {
    setUser,
    getUser,
};