const userModel = require('../models/user.model');
const { validationResult } = require('express-validator')
const userServices = require('../services/user.services')
const blacklistToken = require('../models/blacklistedToken.model')




module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body;
    const hashpassword = await userModel.hassPassword(password);
    const user = await userServices.createUser({
        name,
        email,
        password: hashpassword,
    })
    const token = await user.generateAuthtoken()
    res.cookie('token', token, {
        httpOnly: true,
        secure: true, // Required for HTTPS connections
        sameSite: 'none', // Critical for cross-site cookies
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    console.log("user created",user)
    res.status(201).json({ token, user })
}

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" })
    }
    const ismatch = await user.comparePassword(password)
    if (!ismatch) {
        return res.status(401).json({ message: "Invalid email or password" })
    }
    const token = await user.generateAuthtoken()
    res.cookie('token', token, );
    res.status(201).json({ token, user })
}

module.exports.getCredentials = async (req,res) =>{
    const userdata = req.user.savedCredentials;
    if(!req.user || !req.user._id){
        return res.status(404).json({message:"user not found"})
    }
    try {
        res.status(200).json({userdata})
    } catch (error) {
        res.status(400).json({message:"failed to get user savedCredentials"})
    } 
}

module.exports.addCredentials = async (req, res) => {
    const credentials = req.body
    if(!credentials){
        return res.status(400).json({message:"The credentials are not available"})
    }
    const user = req.user;
    if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    try {
        const index = user.savedCredentials.findIndex(item =>
            item.sitename === credentials.sitename && item.username === credentials.username 
        )
        if(index !== -1){
            user.savedCredentials[index] = credentials
            await user.save();
            console.log('credentials updated successfully')
            return res.status(200).json({message:"credentials updated successfully",user})
        } else {
            await user.savedCredentials.push(credentials);
            await user.save();
            console.log('credentials saved successfully')
            return res.status(200).json({message:"credentials saved successfully",user})
        }
            
    } catch (error) {
        console.log(error)
        res.status(503).json({message: "failed to save credentials"})
    }
    
}

module.exports.removeCredentials = async (req,res) =>{
    try {
        const {_id} = req.params
        const user = await userModel.findById(req.user._id);
        user.savedCredentials = user.savedCredentials.filter(item =>
            item._id.toString() !==_id
        )
        user.save();
        res.status(200).json({message: "Credential removed successfully"})
    } catch (error) {
        res.status(400).json({message:"failed to delete credential"})
    }
    
}

module.exports.logoutUser = async (req, res) => {
    res.clearCookie('token')
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    await blacklistToken.create({ token })
    res.status(200).json({ message: "logged out successfully" })
}