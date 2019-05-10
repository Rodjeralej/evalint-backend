const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    year:{type:String},
    user:{
        id:String,
        name:String,
    },
    group:{
        id:String,
        name:String,
    }
});

module.exports = studentSchema;
