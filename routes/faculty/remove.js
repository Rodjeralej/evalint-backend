const { Joi } = require('koa-joi-router');
const { models: { Faculty } } = require('../../models');

module.exports = {
    method: 'delete',
    path: '/:facId',
    validate: {
        type: 'json',
        params: {
            facId: Joi.objectId(),
        },

    },
    handler: async (ctx) => {

        const { facId }  = ctx.request.params;

        
        const fac = await Faculty.findById(facId);
        
        ctx.assert(fac, 404, 'Faculty not found');

        await Faculty.deleteOne(fac);

        ctx.status = 200;
    },

}