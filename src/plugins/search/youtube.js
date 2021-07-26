const discord = require("discord.js");
const ytSearch = require("yt-search");
const createMenu = require("../../helpers/pagination");
const usageError = require("../../errors/_correctusage");

async function handle(message, args) {
  if (!args) {
    return message.reply(
      usageError.errorMessage("youtube", "please provide a search query!")
    );
  }

  const splitArgs = args.split(" ");

  let possibleSearchTerms = splitArgs[0];
  for (let i = 1; i < splitArgs.length; i++) {
    possibleSearchTerms += " " + splitArgs[i];
  }

  const videoFinder = async (query) => {
    const videoResult = await ytSearch(query);
    return videoResult.videos.length > 1
      ? videoResult.videos.slice(0, 15)
      : null;
  };

  const videos = await videoFinder(possibleSearchTerms);
  if (videos) {
    let counter = 1;
    const numEmbeds = Math.ceil(videos.length / 5);
    const pages = [];

    for (let i = 0; i < numEmbeds; i++) {
      const fields = [];
      const startIdx = counter - 1;
      let endIdx = startIdx + 5;
      if (i == numEmbeds - 1) {
        endIdx = videos.length;
      }
      for (let j = startIdx; j < endIdx; j++) {
        fields.push({
          name: `**${counter}.** ${videos[j].title}`,
          value: videos[j].url,
        });
        counter++;
      }
      const embed = new discord.MessageEmbed()
        .setDescription(
          `Here are your search results for: **${args}**\n Please enter a **number** corresponding to the video you want to play.`
        )
        .setColor("#FF0000")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/861239068401860660/862254178637709342/2465301.png"
        )
        .addFields(fields);
      pages.push(embed);
    }

    const filter = (m) => m.author.id === message.author.id;

    createMenu(message, pages).then((msg) => {
      message.channel
        .awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
        .then((collected) => {
          if (isNaN(collected.first().content)) {
            return message
              .reply({
                content:
                  "Please provide a valid number for the corresponding option. The menu will now close.",
              })
              .then(() => {
                msg.delete({
                  timeout: 0,
                });
              });
          }
          const number = parseInt(collected.first().content);
          if (number >= 1) {
            const selected = videos[number - 1];
            return message
              .reply({
                embed: {
                  author: {
                    name: `${selected.title}`,
                    url: `${selected.url}`,
                    icon_url:
                      "https://cdn.discordapp.com/attachments/861239068401860660/865143281368432670/800px-YouTube_full-color_icon_2017.svg.png",
                  },
                  description: `${selected.url}\n\n**Description: **\n   \`\`\`${selected.description}\`\`\``,
                  thumbnail: {
                    url: `${selected.thumbnail}`,
                  },
                  color: "#FF0000",
                },
              })
              .then(() => {
                msg.delete({
                  timeout: 0,
                });
              });
          } else {
            return message
              .reply({
                content:
                  "Please provide a valid number for the corresponding option. The menu will now close.",
              })
              .then(() => {
                msg.delete({
                  timeout: 0,
                });
              });
          }
        })
        .catch((collected) => {
          message.channel.send("Looks like you are undecided for now.");
        });
    });
  } else {
    return message.reply("We couldn't find anything. Try being more specific.");
  }
}

const options = {
  name: "youtube",
  aliases: ["yt"],
};

module.exports = {
  handle,
  options,
};
