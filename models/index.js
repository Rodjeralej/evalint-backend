const mongoose = require('mongoose');

// routes
const { uniSchema } = require('./university');
const { facultySchema } = require('./faculty');
const { majorSchema } = require('./major');
const { groupSchema } = require('./group');
const { studentSchema } = require('./student');
const { userSchema} = require('./user');
const { roleSchema} = require('./role');


// use native promises; mpromise is deprecated
mongoose.Promise = global.Promise;

module.exports = {
  models: {
    User: mongoose.model('User', userSchema),
    Role: mongoose.model('Role', roleSchema),
    University: mongoose.model('University', uniSchema),
    Student: mongoose.model('Student', studentSchema),
    Group: mongoose.model('Group', groupSchema),
    Major: mongoose.model('Major', majorSchema),
    Faculty: mongoose.model('Faculty', facultySchema),
  }
};
