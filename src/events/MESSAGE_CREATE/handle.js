const noSuchCommandError = require("../../errors/_nosuchcommand");

async function loadHandleCommandEvent(client, logger, message) {
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

  if (client.commands.get(command) === undefined) {
    return message.reply(noSuchCommandError.errorMessage());
  } else {
    return client.commands.get(command).handle(message, args, client);
  }
}

module.exports = loadHandleCommandEvent;
