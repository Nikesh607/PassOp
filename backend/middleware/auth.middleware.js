const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const blacklistedToken = require('../models/blacklistedToken.model')


module.exports.authUser = async (req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    const isblacklisted = await blacklistedToken.findOne({token:token})
    if(isblacklisted){
        return res.status(401).json({message:"Unauthorized"})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)
        req.user = user;
        req.token = token;
        return next();
    } catch (error) {
        res.status(404).json({message:"Unauthorized"})
    }
}