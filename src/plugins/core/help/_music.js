function helpMessage() {
  return {
    embed: {
      author: {
        name: `Fliggy's Support Centre`,
        url: "https://google.com",
        icon_url:
          "https://cdn.discordapp.com/attachments/861239068401860660/861508682414948362/217-2172859_finish-flag-icon-black-white-flag-icon.png"
      },
      title: `**f!music**`,
      description: `\`\`\`Searches and plays music through Fliggy. You must be in a voice channel to use this.\`\`\`\n`,
      fields: [
        {
          name: `***Examples***`,
          value: `\`f!music play <search terms>\`\n Plays the music that is searched for.
          \n \`f!music play https://www.youtube.com/{yourURL}\`\n Plays the audio that is in the Youtube video.
          \n \`f!music skip\`\n Skips the current music track that is playing.
          \n \`f!music pause\`\n Pauses the current music track that is playing.
          \n \`f!music resume\`\n Resumes the current music track that was paused.
          \n \`f!music queue\`\n Shows the music tracks that are currently in queue.
          \n \`f!music stop\`\n Clears the music queue and disconnects Fliggy from the voice channel.`,
          inline: true
        },
        {
          name: `***Usages***`,
          value: `\`f!music play <search terms>\` \n \`f!music play https://www.youtube.com/{yourURL}\` \`f!music skip\` \`f!music pause\` \`f!music resume\` \`f!music queue\` \`f!music stop\``,
          inline: true
        }
      ],
      color: 9160786,
      footer: {
        icon_url:
          "https://cdn.discordapp.com/attachments/861239068401860660/862254178637709342/2465301.png?size=128",
        text: "Do note that the music resume command is currently broken because of library issues on Discord's side."
      }
    }
  };
}

module.exports = {
  helpMessage
};
