const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:{type:String},
});

module.exports = categorySchema;
