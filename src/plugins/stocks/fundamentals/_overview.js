const request = require("request");

async function handleOverview(message, args) {
    if (!args) {
        return message.reply(usageError.errorMessage("stocks"));
      }

      const apiKey = process.env.ALPHA_VANTAGE_API;
    const apiUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${args}&apikey=${apiKey}`;

      const requestBody = {
        url: apiUrl,
        json: true,
        headers: {'User-Agent': 'request'}
      }
    request.get(requestBody, (error, response, body) => {
        if (error) {
          console.log('Error:', error);
        } else if (response.statusCode !== 200) {
          console.log('Status:', response.statusCode);
        } else {
          
        }
    });
}

module.exports = handleOverview;