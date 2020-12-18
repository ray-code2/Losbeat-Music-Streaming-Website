const users = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// Handle Errors
const handleerrors = (err) => {
    console.log(err.message , err.code);
    let errors = {firstname:'' , lastname: '', username:'' ,email: '' , password: ''}
    //incorrect username
    if (err.message === 'Incorrect Username') {
        errors.username = "Oops , Username did't Exist yet"
    }
    //incorrect Password
    if(err.message === 'Incorrect Password') {
        errors.password = 'Oops , Wrong Password'
    }
    //duplicate error code
    if(err.code === 11000){
        errors.email = 'That Email Is already Existed!'
        errors.username = 'That Username Is Already Taken!'
        return errors;
    }
    // validation errors
    if(err.message.includes('user validation failed')){
       Object.values(err.errors).forEach(({properties}) => {
           errors[properties.path] = properties.message;
       })
    }
    return errors;
} 
const maxage = 3 * 24 * 60 * 60;
const createtoken = (id) => {
return jwt.sign({id} , 'Losbeat App Secret', {
    expiresIn: maxage
});
}
module.exports.create_get = (req , res) => {
res.render('signup');
}
module.exports.login_get = (req , res) => {
res.render('Join');
}
module.exports.create_Post = async (req , res) => {
const {firstname , lastname , username , email , password} = req.body;
try {
    const user = await users.create({firstname , lastname , username , email , password})
    const token = createtoken(user._id);
    res.cookie('jwt', token , {httpOnly:true , maxAge: maxage * 1000} )
    res.status(201).json({user: user._id});
} catch (err) {
    const errors = handleerrors(err);
    res.status(400).json({errors});
}

}
module.exports.login_Post = async (req , res) => {
const {username , password} = req.body;
try {
    const user = await users.login(username , password);
    const token = createtoken(user._id);
    res.cookie('jwt', token , {httpOnly:true , maxAge: maxage * 1000} )
    res.status(201).json({user: user._id});
} catch (err) {
    const errors = handleerrors(err);
    res.status(400).json({errors});
}
}