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
console.log("LOGIN API HIT");

   async function handleUserLogin(req,res) {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user || user.password !== password) {
  return res.render("login", {
    error: "Invalid Email or Password",
  });
}

       

    //const sessionId =  uuidv4();-- session id 
    const token = setUser( user);
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
    });
    
     return res.redirect("/");
     

    }

module.exports = {
    handleUserSignup,
    handleUserLogin,
};
