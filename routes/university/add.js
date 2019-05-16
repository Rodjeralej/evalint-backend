const { Joi } = require('koa-joi-router');
const { models: { University } } = require('../../models');

module.exports = {
    method: 'post',
    path: '/',
    validate: {
        type: 'json',
        body: {
            name: Joi.string(),
        },
    
    },
    handler: async (ctx) => {
        const { name } = ctx.request.body;
         

        const uni = new University({
            name,
        });
        await uni.save();

        ctx.status = 200;
        ctx.body = uni;
 
    },
}