function helpMessage() {
  return {
    embed: {
      author: {
        name: `Fliggy's Support Centre`,
        url: "https://google.com",
        icon_url:
          "https://cdn.discordapp.com/attachments/861239068401860660/861508682414948362/217-2172859_finish-flag-icon-black-white-flag-icon.png"
      },
      title: `**f!invite**`,
      description: `\`\`\`Retrieves a link to invite Fliggy to your own server.\`\`\`\n`,
      fields: [
        {
          name: `***Examples***`,
          value: `\`f!invite\`\n posts a link to invite Fliggy to your server.`,
          inline: true
        },
        {
          name: `***Usages***`,
          value: `\`f!invite\``,
          inline: true
        }
      ],
      color: 9160786
    }
  };
}

module.exports = {
  helpMessage
};
