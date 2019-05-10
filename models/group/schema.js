const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    name:{type:String},
    major:{
        id:String,
        name:String,
    }
});

module.exports = groupSchema;
