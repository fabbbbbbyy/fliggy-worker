const anilist = require("anilist-node");
const {
  MessageActionRow,
  MessageMenu,
  MessageMenuOption,
} = require("discord-buttons");
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

  const messageMenuOptions = [];

  console.log(animu)

  for (const anime of animu) {
    const option = new MessageMenuOption()
    .setLabel(anime.title.userPreferred.slice(0, 24))
    .setDescription(anime.title.native)
    .setValue(anime.id);

    messageMenuOptions.push(option);
  }

  const Menu = new MessageMenu()
    .setID("Anime Menu")
    .setPlaceholder("Bring me up, drop me down!")
    .setMaxValues(1)
    .setMinValues(1);

  for (const option of messageMenuOptions) {
      Menu.addOption(option);
  }

  const Row1 = new MessageActionRow().addComponent(Menu);

  await message.reply("\`Please select the title that is relevant to your search.\`", { components: [Row1] });

  client.on("clickMenu", async (menu) => {
    menu.reply.defer();
    const menuValue = parseInt(menu.values[0]);
    const result = await Anilist.media.anime(menuValue);

    message
        .reply({
          embed: {
            title: `${result.title.userPreferred} | ${result.title.native}`,
            description: `${result.description
              .replace(/<br>/gi, "")
              .replace(`[Written by MAL Rewrite]`, "")}`,
            url: `https://anilist.co/anime/${result.id}`,
            color: 174334,
            thumbnail: {
              url: `${result.coverImage.medium}`
            },
            author: {
              name: "AniList Search Result",
              url: "https://anilist.co/",
              icon_url:
                "https://avatars2.githubusercontent.com/u/18018524?s=280&v=4"
            },
            fields: [
              {
                name: "Episodes",
                value: `${result.episodes || "?"}`,
                inline: true
              },
              {
                name: "Type",
                value: `${result.format || "?"}`,
                inline: true
              },
              {
                name: "Status",
                value: `${result.status.toLowerCase() || "?"}`,
                inline: true
              },
              {
                name: "Duration",
                value: `${result.duration || "?"} minutes per episode`,
                inline: true
              },
              {
                name: "Aired",
                value: `from **${result.startDate.year || "?"}-${result
                  .startDate.month || "?"}-${result.startDate.day ||
                  "?"}** to **${result.endDate.year || "?"}-${result.endDate
                  .month || "?"}-${result.endDate.day || "?"}**`
              },
              {
                name: "Average Rating",
                value: `Rated **${result.meanScore || "?"}%** by all users!`,
                inline: true
              },
              {
                name: "Popularity",
                value: `**${result.popularity || "?"}** users follow this!`,
                inline: true
              },
              {
                name: "Genres",
                value: `${result.genres.join(", ") ||
                  "?"}\n`
              }
            ],
            footer: {
              icon_url: `${process.env.SUPPORT_ICON_URL}`,
              text: `Type f!manga or f!manhwa to search for manga/manhwa instead!`
            }
          }
        })
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
