const handleOverview = require("./fundamentals/_overview.js");
const usageError = require("../../errors/_correctusage");

async function handle(message, args) {
  if (!args) {
    return message.reply(usageError.errorMessage("stocks"));
  }
  switch (args) {
    case "overview":
      return handleOverview(message, args);
    default:
      return message.reply(usageError.errorMessage("stocks"));
  }
}

const options = {
  name: "stocks"
};

module.exports = {
  handle,
  options
};