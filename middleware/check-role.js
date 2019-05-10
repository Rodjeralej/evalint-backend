const {
    ERROR_USER_DOES_NOT_MEET_REQUIRED_ROLES,
} = require('../config/constants');

function isRoot(req, res, next) {
    const { authorities } = req.payload;
    if (authorities.root) {
        next();
    } else {
        res.status(401).send({ error: ERROR_USER_DOES_NOT_MEET_REQUIRED_ROLES })
    }
}

function isAdmin(req, res, next) {
    const { authorities } = req.payload;
    if (authorities.admin) {
        next();
    } else {
        res.status(401).send({ error: ERROR_USER_DOES_NOT_MEET_REQUIRED_ROLES })
    }
}

function isManager(req, res, next) {
    const { authorities } = req.payload;
    if (authorities.manager !== undefined && authorities.manager.length > 0) {
        next();
    } else {
        res.status(401).send({ error: ERROR_USER_DOES_NOT_MEET_REQUIRED_ROLES })
    }
}

function isRootOrAdmin(req, res, next) {
    const { authorities } = req.payload;
    if (authorities.root || authorities.admin) {
        next();
    } else {
        res.status(401).send({ error: ERROR_USER_DOES_NOT_MEET_REQUIRED_ROLES })
    }
}

function isAdminOrManager(req, res, next) {
    const { authorities } = req.payload;
    if (authorities.admin || authorities.manager !== undefined) {
        next();
    } else {
        res.status(401).send({ error: ERROR_USER_DOES_NOT_MEET_REQUIRED_ROLES })
    }
}

module.exports = {
    isRoot,
    isAdmin,
    isManager,
    isRootOrAdmin,
    isAdminOrManager,
}