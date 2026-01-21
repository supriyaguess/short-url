//const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");

const sceret = "Supriya$123@$";

function setUser(user) { //--> this function make topken for stateless

    return jwt.sign(
        {
        _id: user._id,
        email: user.email,
        role: user.role,
        },
        sceret
    );
}

/* function setUser(id,user) {
    sessionIdToUserMap.set(id,user);
} */

function getUser(token) {
    if(!token) return null;
    try {
        return jwt.verify(token, sceret);    
    } catch (error) {
         return null;
    }
}
module.exports = {
    setUser,
    getUser,
};