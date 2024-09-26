const multer = require("multer");
const settings = require("../settings");


const file_upload_handler = multer({
  dest: settings.file_dest,
  limits: {
    fileSize: settings.max_file_size,
    files: settings.max_file_limit,
    fieldNameSize: settings.max_file_name_char,
  },
});