const { Joi } = require('koa-joi-router');
const { models: { User } } = require('../../models');

module.exports = {
    method:'post',
    path:'/',
    validate:{
        type:'json',
        body:{
            username: Joi.string(),
            password: Joi.string(),
            role: Joi.string(),
        }
    },
    handler: async (ctx) =>{

        const {username, password, role} = ctx.request.body;

        const user = await User.find({username});

        ctx.assert(user, 404, 'User already exist');

        const newUser = new User({
            username,
            password,
            role,

        });

        await newUser.save();

        ctx.status = 200;
        ctx.body = newUser;

    },

}