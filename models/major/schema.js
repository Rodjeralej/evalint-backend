const mongoose = require('mongoose');

const majorSchema = mongoose.Schema({
    name: {
        type: String,
    },
    facultyId:{
        type: String,
    }
});

module.exports = {
    majorSchema,
};
