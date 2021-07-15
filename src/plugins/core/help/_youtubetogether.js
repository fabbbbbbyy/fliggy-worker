function helpMessage() {
  return {
    embed: {
      author: {
        name: `Fliggy's Support Centre`,
        url: process.env.SUPPORT_SERVER,
        icon_url: process.env.SUPPORT_ICON_URL
      },
      title: `**f!youtubetogether**`,
      description: `\`\`\`Brings up a Youtube Together session. You must be in a voice channel to use this.\`\`\`\n`,
      fields: [
        {
          name: `***Examples***`,
          value: `\`f!youtubetogether\`\n starts a Youtube Together session.`,
          inline: true
        },
        {
          name: `***Usages***`,
          value: `\`f!youtubetogether\``,
          inline: true
        },
        {
          name: `***Aliases***`,
          value: `___ytt___`
        }
      ],
      color: 9160786
    }
  };
}

module.exports = {
  helpMessage
};
