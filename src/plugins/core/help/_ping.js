function helpMessage() {
  return {
    embed: {
      author: {
        name: `Fliggy's Support Centre`,
        url: process.env.SUPPORT_SERVER,
        icon_url: process.env.SUPPORT_ICON_URL
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
      color: 9160786
    }
  };
}

module.exports = {
  helpMessage
};
