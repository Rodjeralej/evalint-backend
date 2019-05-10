const mongoose = require('mongoose');

const professorSchema = mongoose.Schema({
    teachingCategory:{type:String},
    scientificCategory:{type:String},
    user:{
        id:String,
        name:String,        
    },
    group:{
        id:String,
        name:String,
    }
});

module.exports = professorSchema;