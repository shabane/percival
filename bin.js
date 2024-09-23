const settings = require('./settings');
const model = require("./models");

args = process.argv.slice(2)

if (args.includes("migrate")) {
    model.User.sync();
    model.File.sync();
    model.Text.sync();
    model.Link.sync();
    model.User_Data.sync();
    model.User_Link.sync();
    model.User_File.sync();
}

if (args.includes("force-migrate")) {
    settings.sequelize.sync({ force: true });
}
