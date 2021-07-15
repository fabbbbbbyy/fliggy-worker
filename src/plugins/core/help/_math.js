function helpMessage() {
  return {
    embed: {
      author: {
        name: `Fliggy's Support Centre`,
        url: process.env.SUPPORT_SERVER,
        icon_url: process.env.SUPPORT_ICON_URL
      },
      title: `**f!math**`,
      description: `\`\`\`Used to evaluate math expressios.\`\`\`\n`,
      fields: [
        {
          name: `***Examples***`,
          value: `\`f!math 10 + 10\`\n calculates 10 + 10, which should evaluate to 20.`,
          inline: true
        },
        {
          name: `***Usages***`,
          value: `\`f!math <math expression>\``,
          inline: true
        },
        {
          name: `***Aliases***`,
          value: `___calculate___ ___calc___`
        }
      ],
      color: 9160786
    }
  };
}

module.exports = {
  helpMessage
};
