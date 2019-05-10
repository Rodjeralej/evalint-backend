const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    name:{type:String},
});

module.exports = roleSchema;