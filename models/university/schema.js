const mongoose = require('mongoose');


const uniSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

});



module.exports = {
    uniSchema,
};
