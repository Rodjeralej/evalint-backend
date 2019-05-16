const mongoose = require('mongoose');

const facultySchema = mongoose.Schema({

    name: {
        type: String,
    },

    uniId:{
        type: String,
    }
});

module.exports = {
    facultySchema,
};
