const userModel = require('../models/user.model')

module.exports.createUser = async ({name,email,password}) =>{
    if (!name || !email || !password){
        throw new error("All fields are required")
    }

    const user = await userModel.create({
        name,
        email,
        password,
    })
    return user
}