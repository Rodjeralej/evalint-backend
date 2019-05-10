const mongoose = require('mongoose');

const {authoritySchema} = require('./authority');
const {majorSchema} = require('./major');
const {categorySchema} = require('./category');
const {studentSchema} = require('./student');
const {evaluationSchema} = require('./evaluation');
const {facultySchema} = require('./faculty');
const {roleSchema} = require('./role');
const {groupSchema} = require('./group');
const {indicatorSchema} = require('./indicator');
const {nomSchemas} = require('./nomenclator');
const {professorSchema} = require('./professor');
const {uniSchema} = require('./university');
const {userSchema} = require('./user');


// use native promises; mpromise is deprecated
mongoose.Promise = global.Promise;

module.exports = {
  models: {
   Authority: mongoose.model('Authority', authoritySchema),
   Major: mongoose.model('Major', majorSchema),
   Category: mongoose.model('Category', categorySchema),
   Student: mongoose.model('Student', studentSchema),
   Evaluation: mongoose.model('Evaluation', evaluationSchema),
   Faculty: mongoose.model('Faculty', facultySchema),
   Role: mongoose.model('Role', roleSchema),
   Group: mongoose.model('Group', groupSchema),
   Indicator: mongoose.model('Indicator', indicatorSchema),
   Nomenclator: mongoose.model('Nomenclator', nomSchemas),
   Professor: mongoose.model('Professor', professorSchema),
   University: mongoose.model('University', uniSchema),
   User: mongoose.model('User', userSchema),

  },

};
