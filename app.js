const Koa = require("koa");
const bodyParser = require("koa-body-parser");
const mongoose = require("mongoose");
const jwt = require("koa-jwt");
const config = require("config");
const cors = require("@koa/cors");
const dotenv = require("dotenv");
dotenv.config();
//const errorHandler = require('errorhandler');

const { JWT_KEY } = process.env;

//require('./config/passport');

const app = new Koa();

const routes = require("./routes");

app.use(bodyParser());

app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    exposeHeaders: ["X-Total-Count", "Link", "ETag"],
  })
);

app.use(routes.umUser.middleware());

app.listen(3300, () => {
  console.log("Server started successfully at port 3300");
});
