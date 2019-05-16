const { Joi } = require('koa-joi-router');
const { models: { Major } } = require('../../models');

module.exports = {
    method: 'delete',
    path: '/:majorId',
    validate:{
        type:'json',
        params: {
            majorId: Joi.objectId(),
        }
    },
    handler: async (ctx) => {
        
        const {majorId} = ctx.request.params;

        const major = await Major.findById(majorId);

        ctx.assert(major, 404, 'Major not found');

        await Major.deleteOne(major);

        ctx.status = 200;
    },
}