const { Joi } = require('koa-joi-router');
const { models: { Role } } = require('../../models');

module.exports = {
    method: 'post',
    path: '/',
    validate: {
        type: 'json',
        body: {
            name: Joi.string(),
            description: Joi.string(),
        },
    },
    handler: async (ctx) => {
        const { name, description } = ctx.request.body;

        
        const role = new Role({
            name,
            description,
        });

        
        await role.save();

        ctx.status = 200;
        ctx.body = role;
    },
}