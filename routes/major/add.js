const { Joi } = require('koa-joi-router');
const { models: { Major, Faculty } } = require('../../models');

module.exports = {
    method: 'post',
    path: '/:facId',
    validate: {
        type: 'json',
        params: {
            facId: Joi.objectId(),
        },
        body: {
            name: Joi.string(),
        }
    },
    handler: async (ctx) => {

        const { facId } = ctx.request.params;
        const { name } = ctx.request.body;

        const fac = await Faculty.findById(facId);

        ctx.assert(fac, 404, 'Faculty not found');

        const major = new Major({
            name,
            facultyId:facId,
        });

        ctx.status = 200;
        ctx.body = major;

    },
}