function helpMessage() {
  return {
    embed: {
      author: {
        name: `Fliggy's Support Centre`,
        url: process.env.SUPPORT_SERVER,
        icon_url: process.env.SUPPORT_ICON_URL
      },
      title: `**f!stocks**`,
      description: `\`\`\`Used for anything related to stocks.\`\`\`\n`,
      fields: [
        {
          name: `***Examples***`,
          value: `\`f!stocks overview IBM\`\n searches and displays realtime information of IBM stocks.`,
          inline: true
        },
        {
          name: `***Usages***`,
          value: `\`f!stocks overview <company symbol>\``,
          inline: true
        },
        {
          name: `***Aliases***`,
          value: `___stock___`
        }
      ],
      color: 9160786
    }
  };
}

module.exports = {
  helpMessage
};
