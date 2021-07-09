function helpMessage() {
  return {
    embed: {
      author: {
        name: `Fliggy's Support Centre`,
        url: process.env.SUPPORT_SERVER,
        icon_url: process.env.SUPPORT_ICON_URL
      },
      title: `**f!stackoverflow**`,
      description: `\`\`\`Searches for relevant questions asked on StackOverflow.\`\`\`\n`,
      fields: [
        {
          name: `***Examples***`,
          value: `\`f!stackoverflow Node.js\`\n Searches StackOverflow for a question related to Node.js.`,
          inline: true
        },
        {
          name: `***Usages***`,
          value: `\`f!stackoverflow <search terms>\``,
          inline: true
        },
        {
          name: `***Aliases***`,
          value: `___stackexchange___`
        }
      ],
      color: 9160786
    }
  };
}

module.exports = {
  helpMessage
};
