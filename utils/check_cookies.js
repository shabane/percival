response_text = require("../utils/response_text");

function check_cookies(req, res, next) {
    if (!req.cookies.username && !req.cookies.password) {
        res.status(401).send(response_text["401"]);
        return;
    }
    next();
}

module.exports = check_cookies;