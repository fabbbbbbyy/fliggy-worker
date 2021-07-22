const axios = require("axios").default;
const { downEmoji, upEmoji } = require("../../../helpers/emojis");
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

  const api1 = () => {
    return new Promise((resolve, reject) => {
      let searchUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${processedArgs}&apikey=${apiKey}`;
      return axios({
        url: searchUrl,
        timeout: 10000, // e.g. 10s
        method: "GET",
      })
        .then((response) => {
          resolve(response.data); // return results
        })
        .catch((error) => {
          resolve(null);
        });
    });
  };

  const api2 = () => {
    return new Promise((resolve, reject) => {
      let searchUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${processedArgs}&apikey=${apiKey}`;
      return axios({
        url: searchUrl,
        timeout: 10000, // e.g. 10s
        method: "GET",
      })
        .then((response) => {
          resolve(response.data); // return results
        })
        .catch((error) => {
          resolve(null);
        });
    });
  };

  let promise1 = api1();
  let promise2 = api2();

  // Gather results
  let [results1, results2] = await Promise.all([promise1, promise2]);

  const key = Object.keys(results1)[0];
  const innerBody = results1[key];
  const innerKeys = Object.keys(innerBody);

  let sign;
  let emoji;
  if (innerBody[innerKeys[8]].includes("-")) {
    sign = "-";
    emoji = downEmoji;
  } else {
    sign = "+";
    emoji = upEmoji;
  }

  return message.reply({
    embed: {
      url: process.env.SUPPORT_SERVER,
      color: 9160786,
      author: {
        name: `${results2.Symbol} - ${results2.Name}`,
        url: process.env.SUPPORT_SERVER,
        icon_url: process.env.SUPPORT_ICON_URL,
      },
      fields: [
        {
          name: `**${innerBody[innerKeys[1]]}** ${results2.Currency}`,
          value: `**${sign}${innerBody[innerKeys[8]]}** \`(${innerBody[innerKeys[9]]}) ${emoji.main} today.\``,
        }
      ],
      footer: {
        icon_url: process.env.MASCOT_ICON_URL,
        text: "Stock data is only updated every 5 minutes, and might not be REALTIME data.",
      },
    },
  });
}

module.exports = handleOverview;
