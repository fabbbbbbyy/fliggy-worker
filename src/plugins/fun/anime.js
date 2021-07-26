const anilist = require("anilist-node");
const discord = require("discord.js");
const createMenu = require("../../helpers/pagination");
const usageError = require("../../errors/_correctusage");

const Anilist = new anilist();

async function handle(message, args, client) {
  if (!args) {
    return message.reply(
      usageError.errorMessage("anime", "Please provide a valid anime command.")
    );
  }

  const response = await Anilist.search(`anime`, args, 1, 20);

  const animu = response.media;

  if (animu.length === 0) {
    return message.reply(
      usageError.errorMessage(
        "anime",
        `${message.author.username}, try again with a proper title.`
      )
    );
  }

  let counter = 1;
  const numEmbeds = Math.ceil(animu.length / 5);
  const pages = [];

  for (let i = 0; i < numEmbeds; i++) {
    const fields = [];
    const startIdx = counter - 1;
    let endIdx = startIdx + 5;
    if (i == numEmbeds - 1) {
      endIdx = animu.length;
    }
    for (let j = startIdx; j < endIdx; j++) {
      fields.push({
        name: `**${counter}.** ${animu[j].title.userPreferred}`,
        value: animu[j].title.native,
      });
      counter++;
    }
    const embed = new discord.MessageEmbed()
      .setColor(174334)
      .setAuthor("AniList Search Result", "https://avatars2.githubusercontent.com/u/18018524?s=280&v=4", "https://anilist.co/")
      .setDescription(
        `Here are your search results for: **${args}**\n Please enter a **number** corresponding to the result you want to view.`
      )
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
      .then(async (collected) => {
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
          const selected = animu[number - 1].id;
          const result = await Anilist.media.anime(selected);
          return message
            .reply({
              embed: {
                title: `${result.title.userPreferred} | ${result.title.native}`,
                description: `${result.description
                  .replace(/<br>/gi, "")
                  .replace(`[Written by MAL Rewrite]`, "")
                  .replace("`", "")}`,
                url: `https://anilist.co/anime/${result.id}`,
                color: 174334,
                thumbnail: {
                  url: `${result.coverImage.medium}`,
                },
                author: {
                  name: "AniList Search Result",
                  url: "https://anilist.co/",
                  icon_url:
                    "https://avatars2.githubusercontent.com/u/18018524?s=280&v=4",
                },
                fields: [
                  {
                    name: "Episodes",
                    value: `${result.episodes || "?"}`,
                    inline: true,
                  },
                  {
                    name: "Type",
                    value: `${result.format || "?"}`,
                    inline: true,
                  },
                  {
                    name: "Status",
                    value: `${result.status.toLowerCase() || "?"}`,
                    inline: true,
                  },
                  {
                    name: "Duration",
                    value: `${result.duration || "?"} minutes per episode`,
                    inline: true,
                  },
                  {
                    name: "Aired",
                    value: `from **${result.startDate.year || "?"}-${
                      result.startDate.month || "?"
                    }-${result.startDate.day || "?"}** to **${
                      result.endDate.year || "?"
                    }-${result.endDate.month || "?"}-${
                      result.endDate.day || "?"
                    }**`,
                  },
                  {
                    name: "Average Rating",
                    value: `Rated **${
                      result.meanScore || "?"
                    }%** by all users!`,
                    inline: true,
                  },
                  {
                    name: "Popularity",
                    value: `**${result.popularity || "?"}** users follow this!`,
                    inline: true,
                  },
                  {
                    name: "Genres",
                    value: `${result.genres.join(", ") || "?"}\n`,
                  },
                ],
                footer: {
                  icon_url: `${process.env.SUPPORT_ICON_URL}`,
                  text: `Type f!manga or f!manhwa to search for manga/manhwa instead!`,
                },
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
}

const options = {
  name: "anime",
  aliases: ["manga", "manhwa", "weeb"],
};

module.exports = {
  handle,
  options,
};
