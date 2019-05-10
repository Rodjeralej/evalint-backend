let bannedUsers = [];

function addBannedUser(userLogin) {
    bannedUsers.push(userLogin);
}

function getBannedUsers() {
    return bannedUsers;
}

function removeBannedUser(userLogin) {
    bannedUsers = bannedUsers.filter(user => user !== userLogin);
}

module.exports = {
    addBannedUser,
    getBannedUsers,
    removeBannedUser,
};
