const mongoose = require('mongoose');
const db = process.env.DATABASE;

const dataBase = () =>{
    mongoose.connect(db).then(() => {
        console.log(`connection successful`);
    }).catch((err) => console.log(`error in connection.`));
}

module.exports = dataBase;
