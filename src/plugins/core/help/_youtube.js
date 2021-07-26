function helpMessage() {
  return {
    embed: {
      author: {
        name: `Fliggy's Support Centre`,
        url: process.env.SUPPORT_SERVER,
        icon_url: process.env.SUPPORT_ICON_URL
      },
      title: `**f!youtube**`,
      description: `\`\`\`Searches for a video on Youtube.\`\`\`\n`,
      fields: [
        {
          name: `***Examples***`,
          value: `\`f!youtube Vivy\`\n searches for Vivy on Youtube.`,
          inline: true
        },
        {
          name: `***Usages***`,
          value: `\`f!youtube <search terms>\` \`f!yt <search terms>\``,
          inline: true
        },
        {
          name: `***Aliases***`,
          value: `___yt___`
        }
      ],
      color: 9160786
    }
  };
}

module.exports = {
  helpMessage
};
