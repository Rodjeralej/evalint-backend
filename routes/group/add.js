const { Joi } = require('koa-joi-router');
const { models: { Major, Group } } = require('../../models');

module.exports = {
    method: 'post',
    path: '/:majorId',
    validate: {
        type: 'json',
        params: {
            majorId: Joi.objectId(),
        },
        body: {
            name: Joi.string(),
        }

    },
    handler: async (ctx) => {

        const { majorId } = ctx.request.params;
        const { name } = ctx.request.body;

        const major = await Major.findById(majorId);

        ctx.assert(major, 404, 'Major not found');

        const group = new Group({
            name,
            majorId,
        });

        await group.save();

        ctx.status = 200;
        ctx.body = group;
    },
}