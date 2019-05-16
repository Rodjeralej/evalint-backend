const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    userName: {
        type: String,

    },
    year: {
        type: String,
    },
    evaluation: {
        type: String,
    },
    groupId: {
        type: String,
    },

});

module.exports = {
    studentSchema,
};
