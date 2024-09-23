const { User } = require('../models');
const { debug } = require('../settings');


function find_user(username, password) {
    return User.findOne({
        where: {
            username: username,
            password: password,
        }
    }).then(user => {
        if (!user) return null;
        return user;
    }).catch(err => {
        debug(err);
        return null;
    });
}

module.exports = find_user;
