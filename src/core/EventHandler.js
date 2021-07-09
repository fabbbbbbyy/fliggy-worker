const loadReadyEvent = require("../events/READY/log");
const loadMessageCreateEvent = require("../events/MESSAGE_CREATE/handle");
const loadGuildCreateEvent = require("../events/GUILD_CREATE/intro");
const loadGuildMemberAddEvent = require("../events/GUILD_MEMBER_ADD/welcome");

async function prepareCommandHandler(client, logger) {
  client.once("ready", () => {
      loadReadyEvent(client, logger);
  });

  client.on("message", async (message) => {
      await loadMessageCreateEvent(client, logger, message);
  });

  client.on("guildCreate", (guild) => {
      loadGuildCreateEvent(client, logger, guild);
  });

  client.on("guildMemberAdd", async (member) => { 
      await loadGuildMemberAddEvent(client, logger, member);
  });
}

module.exports = prepareCommandHandler;
