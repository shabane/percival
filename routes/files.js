const multer = require("multer");
const settings = require("../settings");
const express = require("express");
const { randInt } = require("../utils/base");
const router = express.Router();
const fs = require("fs");
const {debug} = require("../settings");
const { File, User_File, User} = require("../models");
const find_user = require("../utils/find_user");
const response_text = require("../utils/response_text");
const path = require("path");
const auth = require("basic-auth");


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
  const user = auth(req);

  User.findOne({
    where: {
      username: req.query.toUser,
    }
  }).then((toUser) => {
    if (!toUser) {
      res.status(400).send("User you send files to does not exist!");
      return;
    }

    find_user(user.name, user.pass).then(user => {
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
            user: toUser.id,
            data: new_file.id,
            sender: user.username,
            name: file.originalname,
          }).then(user_file => {
            files.push({
              user: toUser.username,
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
  }).catch((err) => {
    debug(err);
    res.status(500).send(response_text["500"]);
    return;
  });
});


router.get("/", (req, res) => {
  const user = auth(req);
  find_user(user.name, user.pass).then(user => {
    if (!user) {
      res.status(403).send(response_text["403"]);
      return;
    }

    User_File.findAll({
      where: {
        user: user.id,
      }
    }).then(user_file => {
      res.send(user_file);
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


router.get("/:id", (req, res) => {
  const user = auth(req);
  find_user(user.name, user.pass).then(user => {
    User_File.findOne({
      where: {
        user: user.id,
        data: req.params.id,
      }
    }).then(user_file => {
      if (!user_file) {
        res.status(404).send(response_text["404"]);
        return;
      }

      File.findOne({
        where: {
          id: user_file.id,
        }
      }).then(file => {
        if (!file) {
          res.status(404).send(response_text["404"]);
          return;
        }

        res.sendFile(path.join(settings.base_root_dir, file.path));
      }).catch(err => {
        debug(err);
        res.status(500).send(response_text["500"]);
        return;
      });
    }).catch(err => {
      debug(err.message);
      res.status(500).send(err);
      return;
    })
  }).catch(err => {
    debug(err);
    res.status(500).send(response_text["500"]);
    return;
  });
});

exports.router = router;
