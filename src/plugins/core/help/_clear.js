function helpMessage() {
  return {
    embed: {
      author: {
        name: `Fliggy's Support Centre`,
        url: process.env.SUPPORT_SERVER,
        icon_url: process.env.SUPPORT_ICON_URL
      },
      title: `**f!clear**`,
      description: `\`\`\`Used to delete messages in bulk from a channel.\`\`\`\n`,
      fields: [
        {
          name: `***Examples***`,
          value: `\`f!clear 10\`\n clears the 10 most recent messages in the text channel.`,
          inline: true
        },
        {
          name: `***Usages***`,
          value: `\`f!clear 10\``,
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
