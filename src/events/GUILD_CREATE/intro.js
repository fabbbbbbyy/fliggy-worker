async function loadGuildCreateEvent(client, logger, guild) {
  return guild.systemChannel.send({
    embed: {
      title: `${guild.name} -- Fliggy Established`,
      description:
        "Welcome **Fliggy**, we're glad to have you. :european_castle:\n\nTo get started, send `f!help`. Each command works this way, for example, `f!invite`.\n**Fliggy** helps you and your discord community, featuring:\n:people_wrestling:  **Server Management**\n:computer: **Coding Assistance**\n:man_factory_worker: **Gimmicks & Fun**\n\nDo check out the __[Support Server](https://discord.gg/a29mmbRu)__ :helicopter: as well!",
      color: 9160786,
      thumbnail: {
        url: "https://cdn.discordapp.com/attachments/861239068401860660/862254178637709342/2465301.png",
      },
    },
  });
}

module.exports = loadGuildCreateEvent;
