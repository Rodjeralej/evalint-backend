const mongoose = require('mongoose');

const evaluationSchema = mongoose.Schema({
    comment:{ type:String},
    note:{type:String},
    participation:{type:Boolean},
    comments: [{
        author: {
            name: String,
            email: String,
            photo: String,
        },
        date: Date,
        content: String,
    }],
});

module.exports = evaluationSchema; 