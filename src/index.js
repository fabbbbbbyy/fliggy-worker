const Framework = require("./core/Framework");
const Discord = require("discord.js");
const client = new Discord.Client();
require("discord-buttons")(client);
client.commands = new Discord.Collection();
const logger = require("./logger").child({
    module: "index"
});

Framework(client, logger);