const multer = require("multer");
const settings = require("../settings");
const express = require("express");
const { randInt } = require("../utils/base");
const router = express.Router();
const fs = require("fs");
const {debug} = require("../settings");
const { File, User_File } = require("../models");
const find_user = require("../utils/find_user");
const response_text = require("../utils/response_text");


//  file handler instance.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let sub = Date.now().toString() + randInt(settings.max_randint_num).toString();
    let dest = `${settings.file_dest}/${sub}/`;

    if (!fs.existsSync(settings.file_dest)) {
      fs.mkdirSync(settings.file_dest);
    }

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

let file_upload_handler = multer({
  storage: storage,
  limits: {
    fileSize: settings.max_file_size,
    files: settings.max_file_limit,
    fieldNameSize: settings.max_file_name_char,
  },
});


router.post("/", file_upload_handler.array("files"  ), (req, res, next) => {
  find_user(req.cookies.username, req.cookies.password).then(user => {
    if (!user) {
      res.status(403).send(response_text["403"]);
      return;
    }

    let files = [];
    let filePromises = [];

    for (let file of req.files) {
      let filePromise = File.create({
        path: `${file.destination}/${file.originalname}`,
      }).then(new_file => {
        return User_File.create({
          user: user.id,
          data: new_file.id,
        }).then(user_file => {
          files.push({
            user: user.username,
            file: file,
            user_file: user_file,
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
      filePromises.push(filePromise);
    }

    Promise.all(filePromises).then(() => {
      res.send(files);
    }).catch(err => {
      debug(err);
      res.status(500).send(response_text["500"]);
    })
  }).catch(err => {
    debug(err);
    res.status(500).send(response_text["500"]);
    return;
  });
});

exports.router = router;
