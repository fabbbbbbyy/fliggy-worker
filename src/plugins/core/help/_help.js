function helpMessage() {
  return {
    embed: {
      author: {
        name: `Fliggy's Support Centre`,
        url: "https://google.com",
        icon_url:
          "https://cdn.discordapp.com/attachments/861239068401860660/861508682414948362/217-2172859_finish-flag-icon-black-white-flag-icon.png"
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
      color: "#d6bebe"
    }
  };
}

module.exports = {
  helpMessage
};
