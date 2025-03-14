const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: [3, "The name must be 3 character long"]
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        select: false,
        minlength: [6, "The password must be 6 character long"]
    },
    savedCredentials: [{
        sitename: {
            type: String,
            require: true,
        },
        username: {
            type: String,
            require: true,
        },
        sitepassword: {
            type: String,
            require: true,
        },
    }]
})

userSchema.methods.generateAuthtoken = function () {
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token
}

userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.statics.hassPassword =async function (password){
    return await bcrypt.hash(password,10);
}


const User = mongoose.model('user',userSchema);

module.exports = User;

