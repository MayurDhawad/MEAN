const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {

    let userExist = await User.findOne({email: req.body.email})

    if(userExist){
        res.status(400).send({msg: "User already Exist!"})
    }else{
        const saltRound = 10;
        const hashPassword = await bcrypt.hash(req.body.password, saltRound)
        let createdUser = await User.create({
            email: req.body.email,
            password: hashPassword
        })
        
        let payload = { subject: createdUser._id};
        let token = jwt.sign(payload, "secretkey")
        res.status(200).json({token})
    }
}

const login = async (req, res) => {

    let userExist = await User.findOne({email: req.body.email})

    if(!userExist){
        res.status(400).send({msg: "Invalid Credentials"})
    }

    let user = await bcrypt.compare(req.body.password, userExist.password)

    if(user){
        let payload = {subject : userExist._id}
        let token = jwt.sign(payload, "secretkey")
        res.status(200).json({
            msg: "Login Successful!",
            token: token
        })
    }else{
        res.status(401).send({ msg: "Invalid Username aur password "})
    }

}

module.exports.register = register
module.exports.login = login