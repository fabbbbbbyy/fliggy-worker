function helpMessage() {
  return {
    embed: {
      author: {
        name: `Fliggy's Support Centre`,
        url: "https://google.com",
        icon_url:
          "https://cdn.discordapp.com/attachments/861239068401860660/861508682414948362/217-2172859_finish-flag-icon-black-white-flag-icon.png"
      },
      title: `**f!leetcode**`,
      description: `\`\`\`Brings up a menu of algorithm topics for one to choose from.\`\`\`\n`,
      fields: [
        {
          name: `***Examples***`,
          value: `\`f!leetcode\`\n Randomly selects a LeetCode question from an algorithm topic.`,
          inline: true
        },
        {
          name: `***Usages***`,
          value: `\`f!leetcode\``,
          inline: true
        }
      ],
      color: "#d6bebe"
    }
  };
}

module.exports = {
  helpMessage
};
