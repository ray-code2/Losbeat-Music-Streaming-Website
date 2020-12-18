const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bycrpt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
     type:String,
     required: true
    },
    username: {
        type:String,
        required:true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please Enter An Email'],
        lowercase: true,
        validate: [isEmail , 'Please Enter A Valid Email']
    },
    password: {
        type: String,
        required: [true , 'Please Enter An Password'],
        minlength: [6 , 'Password Must Be a minimum of 6 Characters']
    }
})
//Fire a Function Before the doc Save to Database
userSchema.pre('save' , async function (next) {
    const salt = await bycrpt.genSalt();
    this.password = await bycrpt.hash(this.password , salt)
    next();
})
// static method to login user
userSchema.statics.login = async function(username , password){
    const user = await this.findOne({username})
    if (user) {
    const auth = await bycrpt.compare(password, user.password)
    if(auth) {
        return user;
    }
    throw Error('Incorrect Password')
    }
    throw Error('Incorrect Username')
}
//Fire a Function After the doc Save to Database
userSchema.post('save' , function (doc , next) {
    console.log('New user was created & Saved' , doc)
    next();
})

const User = mongoose.model('user' , userSchema);

module.exports = User;





