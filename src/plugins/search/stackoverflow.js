const request = require("request");
const correctUsageError = require("../../errors/_correctusage");

function handle(message, args) {
  if (!args) {
    return message.reply(correctUsageError.errorMessage("stackoverflow"));
  }

  const apikey = process.env.STACKOVERFLOW_API;
  const apiUrl = `${apikey}${encodeURIComponent(args)}&site=stackoverflow`;

  const requestBody = {
    uri: apiUrl,
    gzip: true
  }

  request.get(requestBody, (error, response, body) => {
    if (error) {
      return logger.error(`Stackoverflow gave an error: ${error}!`);
    }
    const results = JSON.parse(body).items;
    if (!results)
      return message.reply("No results were found for your query.");
    if (results.length < 1) {
      return message.reply("No results were found for your query.");
    } else {
      let fields = [];
      for (const result of results) {
        let tags = "";
        for (const tag of result.tags) {
          tags += `\`${tag}\` `;
        }
        tags = tags.trim();
        fields.push({
          name: result.title,
          value: `${result.link}\n __**Tags**__: ${tags}`,
          inline: true
        })
      }
      return message.reply({
        embed: {
          description: `Here are your search results for **"${args}"**!\n`,
          url: "https://www.stackoverflow.com",
          color: "#d6bebe",
          author: {
            name: "StackOverflow",
            url: "https://www.stackoverflow.com",
            icon_url:
              "https://cdn.discordapp.com/attachments/861239068401860660/861896249636945961/768px-Stack_Overflow_icon.svg.png"
          },
          fields: fields
        }
      })
    }
  });
}

const options = {
  name: "stackoverflow",
  aliases: ["stackexchange"]
};

module.exports = {
  handle,
  options
};
