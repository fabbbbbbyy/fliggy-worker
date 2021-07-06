const commands = require("require-all")(`${__dirname}/../`);
const helpers = require("require-all")(`${__dirname}/help`);
const helpError = require("../../errors/_help");

async function handle(message, args) {
  const helpersList = Object.keys(helpers);
  const commandsList = {
    core: [],
    fun: [],
    search: []
  };

  // Handling the case for specific help commands.
  if (args.length > 0 && args.split(" ").length >= 1) {
    let commandWord = args.split(" ")[0];

    const commandToAliasMap = {};
    // Getting all the aliases, and mapping them to their respective command words.
    Object.keys(commands).forEach(category => {
      Object.keys(commands[category]).forEach(command => {
        if (commands[category][command].options) {
          if (commands[category][command].options.aliases) {
            commandToAliasMap[command] = [];
            commands[category][command].options.aliases.forEach(alias => {
              commandToAliasMap[command].push(alias);
            });
          }
        }
      });
    });

    // Mapping what the user typed to a commandWord, if there is.
    Object.keys(commandToAliasMap).forEach(command => {
      commandToAliasMap[command].forEach(alias => {
        if (commandWord === alias) {
          commandWord = command;
        }
      });
    });

    if (helpersList.includes(`_${commandWord}`)) {
      message.reply(helpers[`_${commandWord}`].helpMessage());
      return;
    } else {
      message.reply(helpError.errorMessage());
      return;
    }
  }

  // Handling the case for specific help commands.
  if (args.length > 0 && args.split(" ").length >= 1) {
    let commandWord = args.split(" ")[0];

    const commandToAliasMap = {};
    // Getting all the aliases, and mapping them to their respective command words.
    Object.keys(commands).forEach(category => {
      Object.keys(commands[category]).forEach(command => {
        if (commands[category][command].options) {
          if (commands[category][command].options.aliases) {
            commandToAliasMap[command] = [];
            commands[category][command].options.aliases.forEach(alias => {
              commandToAliasMap[command].push(alias);
            });
          }
        }
      });
    });

    // Mapping what the user typed to a commandWord, if there is.
    Object.keys(commandToAliasMap).forEach(command => {
      commandToAliasMap[command].forEach(alias => {
        if (commandWord === alias) {
          commandWord = command;
        }
      });
    });

    if (helpersList.includes(`_${commandWord}`)) {
      message.reply(helpers[`_${commandWord}`].helpMessage());
      return;
    } else {
      message.reply(helpError.errorMessage());
      return;
    }
  }

  Object.keys(commands).forEach(category => {
    Object.keys(commands[category]).forEach(cmd => {
      commandsList[category].push(cmd);
    });
  });

  message
    .reply({
      embed: {
        // title: "Click here for help, updates & more",
        description:
          "Use the `f!help [command]` to get more help. Example: `f!help ping`.\n",
        url: "https://google.com",
        color: "#d6bebe",
        author: {
          name: "Fliggy's Support Centre",
          url: "https://google.com",
          icon_url:
            "https://cdn.discordapp.com/attachments/861239068401860660/861508682414948362/217-2172859_finish-flag-icon-black-white-flag-icon.png"
        },
        fields: [
          {
            name: ":information_source: Core",
            value: `\`${commandsList.core.join(
              "` `"
            )}\`\n`,
            inline: true
          },
          {
            name: ":question: Search",
            value: `\`${commandsList.search.join(
              "` `"
            )}\`\n`,
            inline: true
          }
        ],
        footer: {
          icon_url:
            "https://cdn.discordapp.com/attachments/861239068401860660/861508155245330442/logo_1.png?size=128",
          text: "Stay tuned for more commands to come."
        }
      }
    })
}

const options = {
  name: "help",
  aliases: ["h"]
};

module.exports = {
  handle,
  options
};
