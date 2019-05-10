const mongoose = require('mongoose');

const facultySchema = mongoose.Schema({
    name:{type:String},
    university:{
        id:String,
        name:String,
    }
});

module.exports = facultySchema;
