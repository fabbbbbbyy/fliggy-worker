const prepareCommandHandler = require("./CommandHandler");
const prepareEventHandler = require("./EventHandler");
const DatabaseClient = require("../database/StubClient");

async function Framework(client, logger) {
    await prepareCommandHandler(client, logger);
    await prepareEventHandler(client, logger);

    client.login(process.env.BOT_TOKEN);
}

module.exports = Framework;