const { Joi } = require('koa-joi-router');
const { models: { Student } } = require('../../models');

module.exports = {
    method: 'delete',
    path: '/:studentId',
    validate: {
        type: 'json',
        params: {
            studentId: Joi.objectId(),
        },
    },
    handler: async (ctx) => {
        const { studentId } = ctx.request.params;

        const student = await Student.findById(studentId);

        ctx.assert(student, 404, 'Student not found');

        await Student.deleteOne(student);

        ctx.status = 200;
    },
}