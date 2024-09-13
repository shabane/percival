const settings = require('./settings');

args = process.argv.slice(2)

if (args.includes("migrate")) {
    settings.sequelize.sync();
}

if (args.includes("force-migrate")) {
    settings.sequelize.sync({ force: true });
}
