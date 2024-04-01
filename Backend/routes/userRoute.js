const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');

const { validationResult } = require('express-validator');
const { createValidator, loginValidator } = require('../utils/validation')
const fetchuser = require('../middleware/fetchuser')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


// SIGN UP (Creating user, no authentication required)
router.post('/createUser', createValidator, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    let success = false;
    try {
        const { name, email, password } = req.body
        // Check Email for Login
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({ success, message: "Email already exists" });
        }
        // Generate Password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
        user = await User.create({ name, email, password: hashPassword })
        
        // Auth Token given
        const data = {"user":{id: user.id}}    //...........why are we returning ID
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true
        return res.status(200).json({ success, authToken })
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ success, message: "Internal Server Error" });
    }
    
});

// LOGIN (Authenticate User, No authentication required)
router.post('/login', loginValidator, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    let success = false;
    try {
        const { email, password } = req.body;
        // Check Email for Login
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({ success, message: "Email does not exists !!!" });
        }

        // Check Password for Login
        const checkPass = await bcrypt.compare(password, user.password)
        if(!checkPass){
            return res.status(400).json({ success, message: "Incorrect Password !!!" });
        }

        // Auth Token given
        const data = {"user":{id: user.id}}       // ................why are we returning ID
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        return res.status(200).json({ success, authToken })        
        
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ success, message: "Internal Server Error"  });
    }
    
});

// GET USER USER (Get loged in user details, no authentication required)
router.post('/getUser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }

});


module.exports = router