const passport = require('passport');
const LocalStrategy = require('passport-local');

const ldapService = require('../service/ldap-auth');
const { User } = require('../models/user');

passport.use(new LocalStrategy({
  usernameField: 'user[userName]',
  passwordField: 'user[password]',
}, (userName, password, done) => {
  ldapService.checkUserCredentials(userName, password).then(ldapResponse => {
    if (ldapResponse.code === 200) {
      User.findOne({ login: userName })
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            const ldapUser = ldapService.createUserFromLDAP(ldapResponse, userName);
            const user = new User(ldapUser);
            user.save().then(savedUser => {
              return done(null, savedUser);
            });
          }
        });
    } else {
      User.findOne({ login: userName }).then(user => {
        if (!user || !user.validatePassword(password)) {
          return done(null, false, { errors: { 'userName or password': 'is invalid' } });
        }
        else return done(null, user);
      });
    }
  }).catch(done);
}));