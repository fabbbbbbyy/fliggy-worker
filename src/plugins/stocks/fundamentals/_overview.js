const request = require("request");
const usageError = require("../../../errors/_correctusage");

const WRONG_ARGS = "";

function processArgs(args) {
  const splitArgs = args.split(" ");
  if (splitArgs.length != 2) {
    return "";
  } else {
    return splitArgs[1].toUpperCase();
  }
}

function getRequest(url) {
  return new Promise(function (success, failure) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        success(body);
      } else {
        failure(error);
      }
    });
  });
}

async function handleOverview(message, args) {
  const processedArgs = processArgs(args);

  if (processedArgs === WRONG_ARGS) {
    return message.reply(usageError.errorMessage("stocks"));
  }

  const apiKey = process.env.ALPHA_VANTAGE_API;
  const overviewApiUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${processedArgs}&apikey=${apiKey}`;
  const priceApiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${processedArgs}&apikey=${apiKey}`;

  let priceData;
  let overviewData;

  await getRequest(priceApiUrl).then(async (body1) => {
    priceData = body1;
    await getRequest(overviewApiUrl);
  }).then(async (body2) => {
    overviewData = body2;
  }).then(() => {
    return message.reply({
      embed: {
        title: ``,
        description: `\`\`\`${overviewData.Description}\`\`\`\n`,
        url: process.env.SUPPORT_SERVER,
        color: 9160786,
        author: {
          name: `${overviewData.Symbol} - ${overviewData.Name}`,
          url: process.env.SUPPORT_SERVER,
          icon_url: process.env.SUPPORT_ICON_URL
        },
        fields: [{
            name: "___Asset Type:___",
            value: `\`${overviewData.AssetType}\``,
            inline: true
          },
          {
            name: "___Exchange Market:___",
            value: `\`${overviewData.Exchange}\``,
            inline: true
          },
          {
            name: "___Currency:___",
            value: `\`${overviewData.Currency}\``,
            inline: true
          },
          {
            name: "___Sector:___",
            value: `\`${overviewData.Sector}\``,
            inline: true
          },
          {
            name: "___Industry:___",
            value: `\`${overviewData.Industry}\``,
            inline: true
          },
          {
            name: "___Analyst Target Price:___",
            value: `\`${overviewData.AnalystTargetPrice}\``,
            inline: true
          }
        ],
        footer: {
          icon_url: process.env.MASCOT_ICON_URL,
          text: "Stock data is only updated every 5 minutes, and might not be REALTIME data."
        }
      }
    })
  })
}

module.exports = handleOverview;