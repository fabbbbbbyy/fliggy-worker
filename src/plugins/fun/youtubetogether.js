const fetch = require("node-fetch");
const { MessageButton } = require("discord-buttons");
const { YOUTUBE_TOGETHER_ID } = require("../../utils/constants");

function handle(message, args, client) {
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    return message.reply(
      "You have to be in a **voice channel** to start a Youtube Together session."
    );
  }

  fetch(`https://discord.com/api/v8/channels/${voiceChannel.id}/invites`, {
    method: "POST",
    body: JSON.stringify({
      max_age: 86400,
      max_uses: 0,
      target_application_id: `${YOUTUBE_TOGETHER_ID}`,
      target_type: 2,
      temporary: false,
      validate: null,
    }),
    headers: {
      Authorization: `Bot ${client.token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((invite) => {
      if (!invite.code) {
        return message.reply("Something went wrong, please try again!");
      }
      const button = new MessageButton()
        .setStyle("url")
        .setURL(`https://discord.com/invite/${invite.code}`)
        .setLabel("Whoosh!");
      return message.reply({
        button,
        embed: {
          description: `Just a few steps away from starting your **Youtube Together** session!\n`,
          color: 9160786,
        },
      });
    });
}

const options = {
  name: "youtubetogether",
  aliases: ["ytt"],
};

module.exports = {
  handle,
  options,
};
