const prepareCommandHandler = require("./CommandHandler");
const prepareEventHandler = require("./EventHandler");
const connectDB = require("../database/MongoClient");

async function Framework(client, logger) {
    await connectDB();
    await prepareCommandHandler(client, logger);
    await prepareEventHandler(client, logger);

    client.login(process.env.BOT_TOKEN);
}

module.exports = Framework;