const { Joi } = require('koa-joi-router');
const { models: { Faculty, University } } = require('../../models');

module.exports = {
    method: 'post',
    path: '/:uniId',
    validate: {
        type: 'json',
        params: {
            uniId: Joi.objectId(),
        },
        body: {
            name: Joi.string(),
        },
    },
    handler: async (ctx) => {

        const { uniId } = ctx.request.params;
        const { name } = ctx.request.body;

        const uni = await University.findById(uniId);
        
        ctx.assert(uni, 404, 'University not found');

        const fac = new Faculty({
            name,
            uniId,
        
        });
        
        await fac.save();

        ctx.status = 200;
        ctx.body = fac;
    },

}