function helpMessage() {
  return {
    embed: {
      author: {
        name: `Fliggy's Support Centre`,
        url: "https://google.com",
        icon_url:
          "https://cdn.discordapp.com/attachments/861239068401860660/861508682414948362/217-2172859_finish-flag-icon-black-white-flag-icon.png"
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
      color: "#d6bebe"
    }
  };
}

module.exports = {
  helpMessage
};
