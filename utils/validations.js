const yup = require("yup");
const setting = require("../settings");

exports.userSchema = yup.object({
    username: yup.string().required().max(setting.max_username_char).min(setting.min_username_char).matches(/^\S*$/),
    password: yup.string().required().max(setting.max_password_char).min(setting.min_password_char),
});
