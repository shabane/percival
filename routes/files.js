const multer = require("multer");
const settings = require("../settings");
const express = require("express");
const { randInt } = require("../utils/base");
const router = express.Router();
const fs = require("fs");
const {debug} = require("../settings");

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
  let files = [];
  for (let file of req.files) {
    files.push(file.destination);
  }
  res.send(files);
});

exports.router = router;
