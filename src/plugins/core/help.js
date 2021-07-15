const commands = require("require-all")(`${__dirname}/../`);
const helpers = require("require-all")(`${__dirname}/help`);
const { infoEmoji, moneyEmoji, pianoEmoji, technologistEmoji } = require("../../helpers/emojis");
const helpError = require("../../errors/_help");

async function handle(message, args) {
  const helpersList = Object.keys(helpers);
  const commandsList = {
    core: [],
    fun: [],
    search: [],
    tech: [],
    music: [],
    stocks: []
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
      return message.reply(helpers[`_${commandWord}`].helpMessage());
    } else {
      return message.reply(helpError.errorMessage());
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
      return message.reply(helpers[`_${commandWord}`].helpMessage());
    } else {
      return message.reply(helpError.errorMessage());
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
        url: process.env.SUPPORT_SERVER,
        color: 9160786,
        author: {
          name: "Fliggy's Support Centre",
          url: process.env.SUPPORT_SERVER,
          icon_url: process.env.SUPPORT_ICON_URL
        },
        fields: [
          {
            name: `${infoEmoji.main} Core`,
            value: `\`${commandsList.core.join(
              "` `"
            )}\`\n`,
            inline: true
          },
          {
            name: `${pianoEmoji.main} Music`,
            value: `\`${commandsList.music.join(
              "` `"
            )}\`\n`,
            inline: true
          },
          // {
          //   name: ":question: Search",
          //   value: `\`${commandsList.search.join(
          //     "` `"
          //   )}\`\n`,
          //   inline: true
          // },
          {
            name: `${technologistEmoji.main} Tech`,
            value: `\`${commandsList.tech.join(
              "` `"
            )}\`\n`,
            inline: true
          },
          {
            name: `${moneyEmoji.main} Stocks`,
            value: `\`${commandsList.stocks.join(
              "` `"
            )}\`\n`,
            inline: true
          }
        ],
        footer: {
          icon_url: process.env.MASCOT_ICON_URL,
          text: "Stay tuned for more commands."
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
