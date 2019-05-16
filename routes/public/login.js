const { Joi } = require('koa-joi-router');
const { models: { User } } = require('../../models');
const createRefreshToken = require('../../lib/createRefreshToken');
const makeToken = require('../../lib/makeToken');


async function loginHandler(ctx, next) {

    const { username, password } = ctx.request.body;

    const user = await User.findOne({ username });
    

    ctx.assert(user, 404, 'User is not register');

    const isValid = user.comparePassword(password);
    ctx.assert(isValid, 422, 'Invalid Password');

    const newRefreshToken = createRefreshToken();
    user.addRefreshToken(newRefreshToken);

    await user.save();

    ctx.state.user = user;
    ctx.state.refreshToken = newRefreshToken;
    await next();

}

async function dataToEncrypt(ctx) {

    const  {user, refreshToken}  = ctx.state;

    
    const userSanitized = await User.sanitize(user);
    
    
    const payload = {
        user: userSanitized,
        userId: userSanitized.id,
    }
    const token = await makeToken(payload);
    console.log(token);
    

    ctx.body = Object.assign({}, ctx.body, {
        token,
        refreshToken: refreshToken.value,
        refreshTokenExpiresAt: refreshToken.expiresAt,
        user: { ...userSanitized },
      });
}


module.exports = {
    method: 'post',
    path: '/login',
    validate: {
        type: 'json',
        body: {
            username: Joi.string(),
            password: Joi.string(),
        },
    },
    handler: [loginHandler,dataToEncrypt],
}