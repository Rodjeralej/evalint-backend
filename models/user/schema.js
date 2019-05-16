const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ObjectId } = mongoose.Schema.Types;
const _ = require('lodash');




const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: [{ type: ObjectId, ref: 'Role' }],
    refreshToken: {

        value: { type: String },
        tokenGroup: { type: String},
        expiresAt: { type: Date },

    },


});

//USER SCHEMA METHODS!!!



userSchema.pre('save', function preSave(next) {
    const user = this;

    if (!user.isModified('password')) {
      return next();
    }

    const newPassword = user.get('password');

    userSchema.statics.makeHash(newPassword)
      .then((hash) => {
        user.set('password', hash);
        next();
      })
      .catch(next);
  });


  function compareToHash(attempt, hash) {
    return new Promise((resolve, reject) => {
        if (!hash) {
            return resolve(false);
        }
        bcrypt.compare(attempt, hash, (err, success) => {
            if (err) {
                reject(err);
            } else {
                resolve(success);
            }
        });
    });
}

userSchema.methods.comparePassword = function comparePassword(attempt) {
    const hash = this.get('password');
    return compareToHash(attempt, hash);
};

userSchema.methods.addRefreshToken = function addRefreshToken(newRefreshToken) {
    this.refreshToken = newRefreshToken;
};

userSchema.static('sanitize', async (userDoc) => {
    const user = userDoc.toObject({ virtuals: true });
    const fieldsToPick = [
        '_id',
        'username',
        'role',
    ];
    const data = _.pick(user, fieldsToPick);
    // data.status = _.get(user, 'account.status');

    // Set user Roles here

    return data;
});

//USER SCHEMA STATICS

userSchema.static('makeHash', (str) => {
    const SALT_WORK_FACTOR = Number(process.env.SALT_WORK_FACTOR) || 12;

    return new Promise(((resolve, reject) => {
      // generate salt
      bcrypt.genSalt(SALT_WORK_FACTOR, (saltErr, salt) => {
        if (saltErr) {
          return reject(saltErr);
        }

        // hash string with salt
        bcrypt.hash(str, salt, (hashErr, hash) => {
          if (hashErr) {
            return reject(hashErr);
          }
          resolve(hash);
        });
      });
    }));
  });

module.exports = {
    userSchema,
};
