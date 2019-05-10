const Koa = require('koa');
const bodyParser = require('koa-body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('errorhandler');
const session = require('express-sessions');
const args = require('yargs').argv;

require('./config/passport');

const app = new Koa();

const routes = require('./routes');

