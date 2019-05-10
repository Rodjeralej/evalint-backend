const bannedUserService = require('../service/banned-service');
const {ERROR_USER_BANNED} = require('../config/constants');

function isBanned(req, res, next) {
    const { login } = req.payload;
    const bannedUsers = bannedUserService.getBannedUsers();
    if (bannedUsers.some(user => user === login)) {
        res.status(400).send({ error: ERROR_USER_BANNED });
    } else {
        next();
    }
}

module.exports = {
    isBanned,
};