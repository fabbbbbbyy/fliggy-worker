function helpMessage() {
  return {
    embed: {
      author: {
        name: `Fliggy's Support Centre`,
        url: process.env.SUPPORT_SERVER,
        icon_url: process.env.SUPPORT_ICON_URL
      },
      title: `**f!leetcode**`,
      description: `\`\`\`Brings up a menu of algorithm topics for one to choose from.\`\`\`\n`,
      fields: [
        {
          name: `***Examples***`,
          value: `\`f!leetcode\`\n Randomly picks a LeetCode question from an algorithm topic.`,
          inline: true
        },
        {
          name: `***Usages***`,
          value: `\`f!leetcode\``,
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
