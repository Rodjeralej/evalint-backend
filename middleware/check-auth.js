const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if(authorization && authorization.split(' ')[0] === 'Bearer') {
    const token = authorization.split(' ')[1];
    if (token !== null && token !== 'null') {
      return token;
    }
    return null;
  }
  return null;
};

module.exports = {
  required: jwt({
    secret: 'evalint-92873rhr3v23rv',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'evalint-92873rhr3v23rv',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};