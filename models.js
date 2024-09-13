const settings = require('./settings');
const { DataTypes } = require('sequelize');


exports.User = settings.sequelize.define(
    "User",
    {
        "username": {
            type: DataTypes.STRING(settings.max_username_char),
            allowNull: false,
            required: true,
            unique: true,
        },
        "password": {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
        },
        "date": {
            type: DataTypes.NOW,
            allowNull: false,
            required: true,
        },
    },
    { timestamps: true },
);

exports.File = settings.sequelize.define(
    "File",
    {
        path: {
            type: DataTypes.STRING(settings.max_file_path_char),
            allowNull: false,
            required: true,
        },
    },
    { timestamps: true },
);

exports.Text = settings.sequelize.define(
    "Text",
    {
        data: {
            type: DataTypes.TEXT,
            allowNull: false,
            required: true,
        },
    },
    { timestamps: true },
);

exports.Link = settings.sequelize.define(
    "Link",
    {
        src: {
            type: DataTypes.STRING(settings.max_user_link_char),
            allowNull: false,
            required: true,
        },
        dest: {
            type: DataTypes.STRING(settings.max_link_char),
            unique: true,
            allowNull: false,
            required: true,
        },
    },
    { timestamps: true },
);

exports.User_Data = settings.sequelize.define(
    "User_Data",
    {
        user: {
            type: DataTypes.INTEGER,
            allowNegative: false,
            allowNull: false,
            required: true,
        },
        data: {
            type: DataTypes.INTEGER,
            allowNegative: false,
            allowNull: false,
            required: true,
        }
    },
    { timestamps: true },
);
