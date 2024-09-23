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
    force = { force: true }
    model.User.sync(force);
    model.File.sync(force);
    model.Text.sync(force);
    model.Link.sync(force);
    model.User_Data.sync(force);
    model.User_Link.sync(force);
    model.User_File.sync(force);
}
