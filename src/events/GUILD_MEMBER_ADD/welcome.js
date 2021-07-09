const { drawCard } = require("discord-welcome-card");

async function loadGuildMemberAddEvent(client, logger, member) {
  const image = await drawCard({
    blur: true,
    title: `Welcome,`,
    theme: "dark",
    text: `${member.user.username}#${member.user.discriminator}.`,
    subtitle: "Enjoy your stay!",
    rounded: true,
    border: true,
    avatar: member.user.displayAvatarURL({ format: "png" }),
  });
  let attachment = new Discord.MessageAttachment(image, "custom.png");
  const id = await member.guild.systemChannelID;
  await member.guild.channels.cache
    .get(id)
    .send(member.user.toString(), attachment);
}

module.exports = loadGuildMemberAddEvent;
