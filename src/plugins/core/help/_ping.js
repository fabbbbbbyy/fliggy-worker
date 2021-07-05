const { infoEmoji } = require("../../../helpers/emojis");

function helpMessage() {
  return {
    embed: {
      author: {
        name: `Fliggy's Support Centre`,
        url: "https://google.com",
        icon_url:
          "https://cdn.discordapp.com/attachments/861239068401860660/861508682414948362/217-2172859_finish-flag-icon-black-white-flag-icon.png"
      },
      title: `**f!ping**`,
      description: `\`\`\`Used to test Fliggy's response time.\`\`\`\n`,
      fields: [
        {
          name: `***Examples***`,
          value: `\`f!ping\`\n pongs the server to check for responsivity.`,
          inline: true
        },
        {
          name: `***Usages***`,
          value: `\`f!ping\``,
          inline: true
        }
      ],
      color: "#d6bebe"
    }
  };
}

module.exports = {
  helpMessage
};
