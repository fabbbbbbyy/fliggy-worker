function helpMessage() {
  return {
    embed: {
      author: {
        name: `Fliggy's Support Centre`,
        url: process.env.SUPPORT_SERVER,
        icon_url: process.env.SUPPORT_ICON_URL
      },
      title: `**f!anime**`,
      description: `\`\`\`Searches for anime/manga listings.\`\`\`\n`,
      fields: [
        {
          name: `***Examples***`,
          value: `\`f!anime Bungou Stray Dogs\`\n searches for the Bungou Stray Dogs anime.\n
                  \`f!manga Oyasumi Punpun\`\n searches for the Oyasumi Punpun manga.\n
                  \`f!manhwa Bastard\`\n searches for the Bastard manhwa.\n
                  \`f!weeb Hachiman\`\n searches for the Hachiman character.`,
          inline: true
        },
        {
          name: `***Usages***`,
          value: `\`f!anime <search terms>\` \`f!manga <search terms>\` \`f!manhwa <search terms>\` \`f!weeb <search terms>\``,
          inline: true
        },
        {
          name: `***Aliases***`,
          value: `___manga___ ___manhwa___ ___weeb___`
        }
      ],
      color: 9160786
    }
  };
}

module.exports = {
  helpMessage
};
