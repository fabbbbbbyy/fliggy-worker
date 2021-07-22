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
          value: `\`f!stocks price IBM\`\n searches and displays realtime price of IBM stocks.\n
          \`f!stocks overview IBM\`\n searches and displays information about the company in charge of IBM.`,
          inline: true
        },
        {
          name: `***Usages***`,
          value: `\`f!stocks price <company symbol>\` \`f!stocks overview <company symbol>\``,
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
