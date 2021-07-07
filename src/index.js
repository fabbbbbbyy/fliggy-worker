const logger = require("./logger").child({
    module: "index"
});

const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();

require("discord-buttons")(client);

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

client.on("message", async message => {
    if (!message.content.startsWith(process.env.STANDARD_PREFIX) || message.author.bot) {
        return;
    }

    const afterPrefix = message.content.split(process.env.STANDARD_PREFIX)[1];

    const splitArgs = afterPrefix.toLowerCase().split(" ");
    const command = splitArgs[0];

    let args = "";
    for (let i = 1; i < splitArgs.length; i++) {
        args += splitArgs[i] + " ";
    }
    args = args.trim();
    
    client.commands.get(command).handle(message, args, client);
})

client.on('guildCreate', guild => {
    guild.systemChannel.send({
        embed: {
            "title": `${guild.name} -- Fliggy Established`,
            "description": "Welcome **Fliggy**, we're glad to have you. :european_castle:\n\nTo get started, send `f!help`. Each command works this way, for example, `f!invite`.\n**Fliggy** helps you and your discord community, featuring:\n:people_wrestling:  **Server Management**\n:computer: **Coding Assistance**\n:man_factory_worker: **Gimmicks & Fun**\n\nDo check out the __[Support Server](https://discord.gg/2EbjnuqG)__ :helicopter: as well!",
            "color": 9160786,
            "thumbnail": {
                "url": "https://cdn.discordapp.com/attachments/861239068401860660/862254178637709342/2465301.png"
            }
        }
    })
})

client.login(process.env.BOT_TOKEN);

module.exports = {
    client
};