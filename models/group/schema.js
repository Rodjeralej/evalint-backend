const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    name: {
        type: String,
    },
    majorId:{
        type: String,
    }
});

module.exports = {
    groupSchema,
};
