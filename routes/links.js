express = require("express");
const router = express.Router()
const find_user = require("../utils/find_user");
const response_text = require("../utils/response_text");
const { Link, User_Link, User } = require("../models");
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


router.post("/", (req, res) => {
    find_user(req.cookies.username, req.cookies.password).then(_user => {
        if (!_user) {
            res.status(403).send(response_text["403"]);
            return;
        }

        User.findOne({
            where: {
                username: req.body.username,
            }
        }).then(user => {
            if (!user) {
                res.status(404).send("Username not exist");
                return;
            }

            Link.create({
                dest: req.body.link,
            }).then(link => {
                User_Link.create({
                    user: user.id,
                    data: link.id,
                });

                res.send({
                    user: user.username,
                    link: Link,
                    user_link: User_Link,
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
    }).catch(err => {
        debug(err);
        res.status(500).send(response_text["500"]);
        return;
    });
});


router.get("/", (req, res) => {
    find_user(req.cookies.username, req.cookies.password).then(user => {
        if (!user) {
            res.status(403).send(response_text["403"]);
            return;
        }

        User_Link.findAll({
            where: {
                user: user.id,
            }
        }).then(user_links => {
            res.send(user_links);
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


router.options("/", (req, res) => {
    res.send(["GET", "POST"]);
});


exports.router = router;
