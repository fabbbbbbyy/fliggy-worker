function helpMessage() {
  return {
    embed: {
      author: {
        name: `Fliggy's Support Centre`,
        url: process.env.SUPPORT_SERVER,
        icon_url: process.env.SUPPORT_ICON_URL
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
