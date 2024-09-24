express = require("express");
const router = express.Router();
respose_text = require("../utils/response_text");
const { User } = require("../models");
const {debug} = require("../settings");

router.post("/", (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
        }
    }).then(user => {
        if (user) {
            res.status(406).send("User Exist!");
            return;
        }

        User.create({
            username: req.body.username,
            password: req.body.password,
        }).then(new_user => {
            res.send(new_user);
            return;
        }).catch(err => {
            debug(err);
            res.status(500).send(respose_text["500"]);
            return;
        });
    }).catch(err => {
        debug(err);
        res.status(500).send(respose_text["500"]);
        return;
    });
});


exports.router = router;
