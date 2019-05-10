const mongoose = require('mongoose');

const universitySchema = mongoose.Schema({
    nombre:{type:String},
});

module.exports = mongoose.model('University', universitySchema);
