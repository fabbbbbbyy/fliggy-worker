const usageError = require("../../errors/_correctusage");
const permissionError = require("../../errors/_nopermissions");
const { thumbsUpEmoji } = require("../../helpers/emojis");

async function handle(message, args) {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.reply(permissionError.errorMessage());
  }
  if (!args) {
    return message.reply(usageError.errorMessage("clear"));
  }

  if (isNaN(args)) {
    return message.reply("Please enter a real number!");
  }

  if (args > 100) {
    return message.reply("You cannot delete more than 100 messages.");
  }
  if (args < 1) {
    return message.reply("You must delete at least a message!");
  }

  await message.channel.messages.fetch({ limit: ++args }).then((messages) => {
    message.channel.bulkDelete(messages);
  });

  return message.reply({
    embed: {
      title: `Successfully cleared **${--args}** messages!`,
      description: `Action requested by - **@${message.author.username}**`,
      color: 9160786
    },
  });
}

const options = {
  name: "clear",
};

module.exports = {
  handle,
  options,
};
