const {v4: uuidv4} = require('uuid');
const User = require("../models/user");
const {setUser} = require("../service/auth");

async function handleUserSignup(req, res) {
    try {
        const { name, email, password } = req.body;

        // validation
        if (!name || !email || !password) {
            return res.status(400).send("All fields are required");
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        // create user
        await User.create({
            name,
            email,
            password, // plain for now
        });

        return res.redirect("/"); // or /login
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}
   async function handleUserLogin(req,res) {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if(!user) 
            return res.render("login", {
        error: "Invalid Username or Password ",
    });

    //const sessionId =  uuidv4();-- session id 
    const token = setUser( user);
    res.clearCookie("token"); // Clear any existing token
    res.cookie("token", token);
     return res.redirect("/");
    }

async function handleUserLogout(req, res) {
    res.clearCookie("token");
    return res.redirect("/login");
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout,
};
