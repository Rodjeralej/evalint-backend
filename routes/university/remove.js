const { Joi } = require('koa-joi-router');
const { models: { University } } = require('../../models');

module.exports = {
    method: 'delete',
    path: '/:uniId',
    validate: {
        type: 'json',
        params: {
            uniId: Joi.objectId(),
        }
    },
    handler: async (ctx) => {

        const { uniId } = ctx.request.params;

        const uni = await University.findById(uniId);

        ctx.assert(uni, 404, 'University not found');

        await University.deleteOne(uni);

        ctx.status = 200;

        


    },

}