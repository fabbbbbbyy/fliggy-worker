const request = require("request");
const usageError = require("../../../errors/_correctusage");

const NO_ARGS = "";

function processArgs(args) {
  const splitArgs = args.split(" ");
  if (splitArgs.length != 2) {
    return "";
  } else {
    return splitArgs[1].toUpperCase();
  }
}

async function handleOverview(message, args) {
  const processedArgs = processArgs(args);

  if (processedArgs === NO_ARGS) {
    return message.reply(usageError.errorMessage("stocks"));
  }

  const apiKey = process.env.ALPHA_VANTAGE_API;
  const overviewApiUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${processedArgs}&apikey=${apiKey}`;

  const requestBody = {
    url: overviewApiUrl,
    json: true,
    headers: { "User-Agent": "request" }
  }

  request.get(
    requestBody,
    (error, response, body) => {
      if (error) {
        console.log("Error:", error);
      } else if (response.statusCode !== 200) {
        console.log("Status:", res.statusCode);
      } else {
        return message.reply({
          embed: {
            title: ``,
            description: `\`\`\`${body.Description}\`\`\`\n`,
            url: process.env.SUPPORT_SERVER,
            color: 9160786,
            author: {
              name: `${body.Symbol} - ${body.Name}`,
              url: process.env.SUPPORT_SERVER,
              icon_url: process.env.SUPPORT_ICON_URL,
            },
            fields: [
              {
                name: "___Asset Type:___",
                value: `\`${body.AssetType}\``,
                inline: true,
              },
              {
                name: "___Exchange Market:___",
                value: `\`${body.Exchange}\``,
                inline: true,
              },
              {
                name: "___Currency:___",
                value: `\`${body.Currency}\``,
                inline: true,
              },
              {
                name: "___Sector:___",
                value: `\`${body.Sector}\``,
                inline: true,
              },
              {
                name: "___Industry:___",
                value: `\`${body.Industry}\``,
                inline: true,
              },
              {
                name: "___Analyst Target Price:___",
                value: `\`${body.AnalystTargetPrice}\``,
                inline: true,
              },
            ],
            footer: {
              icon_url: process.env.MASCOT_ICON_URL,
              text: "Stock data is only updated every 5 minutes, and might not be REALTIME data.",
            },
          },
        });
      }
    }
  );
}

module.exports = handleOverview;
