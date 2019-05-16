const Koa = require('koa');
const bodyParser = require('koa-body-parser');
const mongoose = require('mongoose');
const jwt = require('koa-jwt');
const config = require('config');
const cors = require('@koa/cors');
const dotenv = require('dotenv');
dotenv.config();
//const errorHandler = require('errorhandler');

const {JWT_KEY} = process.env;


//require('./config/passport');

const app = new Koa();

const routes = require('./routes');

app.use(bodyParser());

app.use(cors({
    origin: '*',
    allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    exposeHeaders: ['X-Total-Count', 'Link', 'ETag'],
  }));

app.use(routes.pub.middleware());
app.use(routes.user.middleware());
app.use(routes.role.middleware());

app.use(jwt({ secret: JWT_KEY, key: 'jwt', debug: config.get('jwt.debugEnabled') }));

app.use(routes.uni.middleware());
app.use(routes.fac.middleware());
app.use(routes.major.middleware());
app.use(routes.group.middleware());
app.use(routes.student.middleware());

try {
    mongoose.connect('mongodb://localhost:27017/evalint', { useNewUrlParser: true });
    console.log('Connected succesfully to the data base at port 27017');
    
}
catch (err) {
    if (err) {
        console.log('Error trying to connect to the database');
    }
}


app.listen(3300, () => {
    console.log('Server started successfully at port 3300');
    
});

