const { Sequelize } = require('sequelize');

exports.sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
})

exports.max_username_char = 128;

exports.max_file_path_char = 128;

exports.file_dest = "./user_files";

exports.max_link_char = 128;

exports.max_user_link_char = 128;

