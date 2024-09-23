express = require("express");
const router = express.Router()
const find_user = require("../utils/find_user");
const response_text = require("../utils/response_text");
const { Link, User_Link } = require("../models");
const {debug} = require("../settings");


router.get("/:id", (req, res) => {
    find_user(req.cookies.username, req.cookies.password).then(user => {
        if (!user) {
            res.status(403).send(response_text["403"]);
            return;
        }

        User_Link.findOne({
            where: {
                user: user.id,
                data: req.params.id,
            }
        }).then(user_link => {
            if (!user_link) {
                res.status(404).send(response_text["404"]);
                return;
            }

            Link.findByPk(user_link.data).then(link => {
                res.redirect(link.dest);
            }).catch(err => {
                debug(err);
                res.status(500).send(response_text["500"]);
                return;
            });
        }).catch(err => {
            debug(err);
            res.status(500).send(response_text["500"]);
            return;
        });
    }).catch(err => {
        debug(err);
        res.status(500).send(response_text["500"]);
        return;
    });
});

exports.router = router;
