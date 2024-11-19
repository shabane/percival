const { Sequelize } = require('sequelize');
exports.debug = require('debug')('app:deployment')

exports.sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
})

exports.max_username_char = 128;
exports.min_username_char = 3;

exports.max_password_char = 256;
exports.min_password_char = 8;

exports.max_file_name_char = 128;
exports.file_dest = "./user_files";
MB = 1024 * 1024;   // This mean MB, add another `*1024` to make it GB and so on.
exports.max_file_size = 10 * MB;  // Set Limit to 10MB.
exports.max_file_limit = 5; // Max number of upload files limit.
exports.max_randint_num = 256;    // Max random int for sub dir.

exports.max_link_char = 128; //TODO: create validation for this

exports.max_user_link_char = 128; //TODO: create validation for this

exports.file_expire_days = (1) * 86_400 * 1_000;

exports.text_expire_days = (1) * 86_400 * 1_000;

exports.link_expire_days = (1) * 86_400 * 1_000;

exports.base_root_dir = __dirname;
