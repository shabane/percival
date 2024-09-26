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

exports.max_file_path_char = 128;

exports.file_dest = "./user_files";

exports.max_link_char = 128;

exports.max_user_link_char = 128;

exports.file_expire_days = 1;

exports.text_expire_days = 1;

exports.link_expire_days = 1;
