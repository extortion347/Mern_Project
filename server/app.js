const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
dotenv.config({ path: './config.env' });
const PORT = process.env.PORT;
const connDB = require('./db/conn');

connDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// const User = require('./model/userSchema');

// convert any file which comes in json format into this object file type.

// we link our router files to make our routes easy.


// const middleware = (req,res,next) => {
//     console.log(`Hello my middleware.`);
//     next();
// }

// middleware();

app.use(require('./router/auth'));

app.get('/', (req, res) => {
    res.send(`Hello from the server side.`);
});

// app.get('/about', (req, res) => {
//     res.send(`About says hello from the server side.`);

// });



app.get('/signup', (req, res) => {
        res.send(`Hello Registration world from the server.`);
})


app.get('/home', (req, res) => {
    res.cookie("Test",'thapa');
    res.send(`Home says hello from the server side.`);
})

app.listen(PORT, console.log(`The server is being read on port ${PORT}.`));