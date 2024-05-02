const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('../Model/List')
const users = fs.Users

exports.register = async (req, res) => {
    const { f_userName, f_Email, f_Pwd } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(f_Pwd, 10)
        const newUser = await users.create({
            f_Email: f_Email,
            f_userName: f_userName,
            f_Pwd: hashedPassword,
        }
        );
        res.status(201).json({ message: "User created successfully" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ messsage: "Failed to create user" })
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await users.findOne({
            f_userName: username
        })
        if (!user) return res.status(401).json({ message: "Invalid Credentials!" })
        const isPasswordValid = await bcrypt.compare(password, user.f_Pwd)
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid Credentials!" })
        const age = 1000 * 60 * 60 * 24 * 7
        const token = jwt.sign({
            id: user.f_userName
        },
            process.env.JWT_KEY,
            { expiresIn: age }
        );
        const { password: userPassword, ...userInfo } = user
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: age,
        })
        res.status(200).json(token)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: `${err}Failed to Login!` })
    }
};

exports.logout = (req, res) => {
    console.log("logout")
    res.clearCookie("token").status(200).json({ message: "Logout Successful" })
};
