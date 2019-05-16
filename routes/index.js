const { Joi } = require('koa-joi-router');
const objectIdFactory = require('joi-objectid');

Joi.objectId = objectIdFactory(Joi);

const router = require('koa-joi-router');


const uniRoutes = require('./university');
const facRoutes = require('./faculty');
const majorRoutes = require('./major');
const groupRoutes = require('./group');
const studentRoutes = require('./student');
const pubRoutes = require('./public');
const userRoutes = require('./user');
const roleRoutes = require('./role');

const pub = router();
pub.prefix('/pub');
pub.route(pubRoutes);

const uni = router();
uni.prefix('/university');
uni.route(uniRoutes);

const fac = router();
fac.prefix('/faculty');
fac.route(facRoutes);

const major = router();
major.prefix('/major');
major.route(majorRoutes);

const group = router();
group.prefix('/group');
group.route(groupRoutes);

const student = router();
student.prefix('/student');
student.route(studentRoutes);

const user = router();
user.prefix('/user');
user.route(userRoutes);

const role = router();
role.prefix('/role');
role.route(roleRoutes);

const routes = {
  uni,
  fac,
  major,
  group,
  student,
  pub,
  user,
  role

  
};

module.exports = routes;
