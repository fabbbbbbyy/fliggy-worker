const loadLogEvent = require("../events/READY/log");
const loadActivityEvent = require("../events/READY/activity");
const loadHandleCommandEvent = require("../events/MESSAGE_CREATE/handle");
const loadIntroEvent = require("../events/GUILD_CREATE/intro");
const loadWelcomeEvent = require("../events/GUILD_MEMBER_ADD/welcome");
const loadAutoroleEvent = require("../events/GUILD_MEMBER_ADD/autorole");

async function prepareCommandHandler(client, logger) {
  client.once("ready", () => {
    loadLogEvent(client, logger);
    loadActivityEvent(client, logger);
  });

  client.on("message", async (message) => {
    await loadHandleCommandEvent(client, logger, message);
  });

  client.on("guildCreate", (guild) => {
    loadIntroEvent(client, logger, guild);
  });

  client.on("guildMemberAdd", async (member) => {
    await loadWelcomeEvent(client, logger, member);
  });

  client.on("guildMemberAdd", async (member) => {
    await loadAutoroleEvent(client, logger, member);
  });
}

module.exports = prepareCommandHandler;
