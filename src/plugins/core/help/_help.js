function helpMessage() {
  return {
    embed: {
      author: {
        name: `Fliggy's Support Centre`,
        url: process.env.SUPPORT_SERVER,
        icon_url: process.env.SUPPORT_ICON_URL
      },
      title: `**f!help**`,
      description: `\`\`\`Displays the full list of Fliggy commands.\`\`\`\n`,
      fields: [
        {
          name: `***Examples***`,
          value: `\`f!help\`\n brings up Fliggy's Support Centre. *- heck, what are you even doing here?*`,
          inline: true
        },
        {
          name: `***Usages***`,
          value: `\`f!help\``,
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
