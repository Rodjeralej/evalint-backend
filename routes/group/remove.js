const { Joi } = require('koa-joi-router');
const { models: { Group } } = require('../../models');

module.exports = {
    method: 'delete',
    path: '/:groupId',
    validate: {
        type: 'json',
        params: {
            groupId: Joi.objectId(),
        },

    },
    handler: async (ctx) => {
        
        const { groupId } = ctx.request.params;

        const group = await Group.findById(groupId);

        ctx.assert(group, 404, 'Group not found');

        await Group.deleteOne(group);

        ctx.status = 200;

    },
}