const { User } = require('../models/user');
const bannedService = require('../service/banned-service');

const defaultUser = {
    login: 'root',
    password: 'root',
    name: 'Activate Root',
    email: 'root@activate.umcc.cu',
    authorities: {
        root: true,
        admin: true,
    }
};

function initDB() {
    User.find({ login: defaultUser.login }).then(users => {
        if (users.length === 0) {
            const user = new Users(defaultUser);
            user.setPassword(defaultUser.password);
            user.save();
        }
    });
}

function loadBannedUsers() {
    User.find({banned: true}).then(users => {
        users.forEach(user => bannedService.addBannedUser(user.login));
    });
}

module.exports = {
    initDB,
    loadBannedUsers,
};

