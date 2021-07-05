const logger = require("./logger").child({
    module: "index"
});

const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();

const path = require('path');
const fs = require('fs');
const dirPath = path.resolve(__dirname, './plugins');

function getFiles(dir, files_) {
    files_ = files_ || [];
    const files = fs.readdirSync(dir);
    for (const i in files){
        if (!files[i].includes("_")) {
            const name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()){
                getFiles(name, files_);
            } else {
                files_.push(name);
            }
        }
    }

    const splitFileNames = [];
    
    for (const file of files_) {
        const splitFileName = file.split("plugins/");
        splitFileNames.push(splitFileName[1]);
    }

    return splitFileNames;
}

const pluginFiles = getFiles(dirPath);

for (const file of pluginFiles) {
    const plugin = require(`./plugins/${file}`);
    client.commands.set(plugin.options.name, plugin);
    if (plugin.options.aliases != undefined) {
        for (const alias of plugin.options.aliases) {
            client.commands.set(alias, plugin);
        }
    }
}

client.once("ready", () => {
    logger.info(`Fliggy Worker is up, running and working hard!`)
})

client.on("message", message => {
    if (!message.content.startsWith(process.env.STANDARD_PREFIX) || message.author.bot) {
        return;
    }

    const args = message.content.split(process.env.STANDARD_PREFIX)[1];

    const command = args.toLowerCase().split(" ")[0];
    client.commands.get(command).handle(message, args);
})

client.login(process.env.BOT_TOKEN);