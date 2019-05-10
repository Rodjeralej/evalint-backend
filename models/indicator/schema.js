const mongoose = require('mongoose');

const indicatorSchema = mongoose.Schema({
    name:{type:String},
});

module.exports = indicatorSchema;
