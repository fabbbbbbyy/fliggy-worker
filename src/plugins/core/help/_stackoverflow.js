function helpMessage() {
  return {
    embed: {
      author: {
        name: `Tatsu's Help Menu`,
        url: "https://tatsubot.com",
        icon_url:
          "https://cdn.discordapp.com/avatars/172002275412279296/f5f65755f67ae1dc88d9bb271d0f5bef.jpg"
      },
      title: `**t!youtube**`,
      description: `\`\`\`Searches for Youtube videos and displays them onto Discord.\`\`\`\n`,
      fields: [
        {
          name: `***Examples***`,
          value: `\`t!youtube\`\n Searches Youtube for a random video of any kind.
                    \n \`t!youtube Tatsu\`\n Searches Youtube for a video with Tatsu in it.`,
          inline: true
        },
        {
          name: `***Usages***`,
          value: `\`t!youtube\` \`t!youtube <search terms>\``,
          inline: true
        },
        {
          name: `***Aliases***`,
          value: `___youtube___, ___yt___`
        }
      ],
      color: 1548647
    }
  };
}

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
          value: `\`t!stackoverflow <search terms>\``,
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
