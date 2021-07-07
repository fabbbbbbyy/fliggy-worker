const { exclaimationEmoji } = require("../helpers/emojis");

function errorMessage(plugin) {
  return {
    embed: {
      author: {
        name: `Fliggy's Support Centre`,
        url: "https://google.com",
        icon_url:
          "https://cdn.discordapp.com/attachments/861239068401860660/861508682414948362/217-2172859_finish-flag-icon-black-white-flag-icon.png"
      },
      description: `${exclaimationEmoji.main} Sorry, please check \`f!help ${plugin}\` for the correct usage. ${exclaimationEmoji.main}\n`,
      color: 9160786
    }
  };
}

module.exports = {
  errorMessage
};
