const { Joi } = require('koa-joi-router');
const { models: { Student, Group } } = require('../../models');

module.exports = {
    method: 'post',
    path: '/:groupId',
    validate: {
        type: 'json',
        params: {
            groupId: Joi.objectId(),
        },
        body: {
            userName: Joi.string(),
            year: Joi.string(),
            evaluation: Joi.string(),

        },
    },
    handler: async (ctx) => {

        const { groupId } = ctx.request.params;
        const { userName, year, evaluation } = ctx.request.body;

        const group = await Group.findById(groupId);

        ctx.assert(group, 404, 'Group not found');

        const student = new Student({
            userName,
            year,
            evaluation,
            groupId,

        });

        await student.save();

        ctx.status = 200;
        ctx.body = student;

    },

}