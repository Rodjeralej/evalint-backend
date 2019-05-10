const mongoose = require('mongoose');

const majorSchema = mongoose.Schema({
    name:{type:String},
    faculty:{
        id:String,
        name:String,
    }
});

module.exports = majorSchema;
