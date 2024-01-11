const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true  
    },
    phone:{
        type:String,
        required:true  
    },
    work:{
        type:String,
        required:true  
    },
    password:{
        type:String,
        required:true  
    },
    cpassword:{
        type:String,
        required:true  
    },
    date : {
type:Date,
default:Date.now
    },
    message: [
        {
            name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true  
            },
            phone:{
                type:String,
                required:true  
            },
            message:{
                type:String,
                required:true  
            }
        }

    ],
    tokens: [
        {
            token: {
                type: String,
                required:true
            }
        }
    ]
});


userSchema.pre('save', async function(next) {
    console.log('hi from hamza');
    if(this.isModified('password')) {
        console.log('hi i am pre password...')
        this.password = bcrypt.hash(this.password,12);
        this.cpassword = bcrypt.hash(this.cpassword,12);
    }

    next();
});

userSchema.methods.generateAuthToken = async function() {
try{
    let tokenThapa = jwt.sign({_id: this._id}, process.env.SECRET_KEY);

this.tokens = this.tokens.concat({token: tokenThapa});
await this.save();
return token;

}catch(err){
console.log(err);
}
}

// stored the message

userSchema.methods.addMessage = async function(name,email,phone,message){
    try{
        this.message = this.messages.concat({name,email,phone,message})
        await this.save();
        return this.messages;
    }catch(error){
        console.log(error)
    }
}


// collection creation
const User = mongoose.model('User',userSchema);
module.exports = User;