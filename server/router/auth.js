const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate");
// iss connection waale part ki zarroorat nahi
// require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send(`Hello from the server router side hahaa.`);
});

// BY USING PROMISES
// router.post('/register', (req, res) => {

//     const { name, email, phone, work, password, cpassword } = req.body;

//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error: "Please fill the field properly." })
//     }

//     User.findOne({ email: email }).then((userExist) => {
//         if (userExist) {
//             return res.status(422).json({ error: "Email already exist." });
//         }

//         const user = new User({ name, email, phone, work, password, cpassword });

//         user.save().then(() => {
//             res.status(201).json({ message: "User registered successfully." });
//         }).catch((err) => res.status(500).json({ error: "Failed to register." }));

//     }).catch(err => { console.log(err); });
//     // console.log(name);
//     // console.log(email);
//     // res.json({message:req.body});
//     // res.send(`This is our page.`);
// });

// async await version

router.post('/register', async(req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill the field properly." })
    }

    try{

        const userExist = await User.findOne({ email: email });
      
            if (userExist) {
                return res.status(422).json({ error: "Email already exist." });
            }else if(password != cpassword){
                return res.status(422).json({ error: "Passwords are not matching." }); 
            }else{

                const user = new User({ name, email, phone, work, password, cpassword });

                // yaha pe hash password waala scene hoga
        
    const userRegister = await user.save();
    
    if(userRegister){
        res.status(201).json({ message: "User registered successfully." });
    }else{
        // koi khaas faida nahi isss statement ka lekin phir bhi
        res.status(500).json({ error: "Failed to register." });
    }

            }
    
        

    }catch(err){

        console.log(err); 

    } 
    // console.log(name);
    // console.log(email);
    // res.json({message:req.body});
    // res.send(`This is our page.`);
});

//login route

router.post('/signin', async(req,res) => {
try{
    let token;
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400).json({error:"Credentials incomplete"});
    }
       const userLogin = await User.findOne({email:email});
       console.log(userLogin);

if(userLogin){

    
    const isMatch = await bcrypt.compare( password, userLogin.password);
   token = await userLogin.generateAuthToken();

    console.log(token);

    res.cookie("jwtoken", token, {
        expires: new Date(Date.now()+ 25892000000),
        httpOnly: true
    })

    if(!isMatch){
    res.status(400).json({error:"Invalid Credentials"});
    }else{
        res.json({message: "user signin successful"});
    }
    

}else{
    res.status(400).json({error:"Invalid Credentials pass"});

}

}catch(err){
console.log(err);
}

});

//about us ka page
router.get('/about', authenticate ,(req, res) => {
    console.log('Hello my About');
    res.send(req.rootUser);

});


// get user data for contact us and home page
router.get(('/getdata', authenticate, (req,res) => {
    console.log(`Hello my About`);
    res.send(req.rootUser);
}));

// contact us page

router.post('/contact', authenticate ,async(req,res) => {
    
try{

    const { name, email, phone, message} = req.body;

    if(!name || !email|| !phone|| !message) {
        console.log("error in contact form");
return res.json({error: "plz filled the contact from"});
    }

const userContact = await User.findOne({_id:req.userID})

if(userContact){
    const userMessage = await userContact.addMessage(name, email, phone, message);

    await userContact.save();

    res.status(201).json({message:"user contact successfully"});
}

} catch(error){
console.log(error);
}

});

//Logout ka page
router.get('/logout', (req, res) => {
    console.log('Hello my Logout Page');
   res.clearCookie('jwtoken', {path:'/'})
    res.status(200).send('User logout');

});

module.exports = router;