const mongoose = require('mongoose');

const authoritySchema = mongoose.Schema({
    name: { type: String, required: true }
});  

module.exports = authoritySchema;