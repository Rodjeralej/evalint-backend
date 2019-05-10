const mongoose = require('mongoose');


const nomSchema = mongoose.Schema({
    name: { type: String, required: true },
    values: { type: Array }
});

module.exports = nomSchema;
