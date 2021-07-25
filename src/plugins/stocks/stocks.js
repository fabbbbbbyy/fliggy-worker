const handleOverview = require("./stocks_commands/_overview.js");
const handlePrice = require("./stocks_commands/_price.js");
const usageError = require("../../errors/_correctusage");

async function handle(message, args) {
  if (!args) {
    return message.reply(usageError.errorMessage("stocks", "Please provide a valid stock command."));
  }
  
  const pluginName = args.split(" ")[0];

  switch (pluginName) {
    case "overview":
      return handleOverview(message, args);
    case "price":
      return handlePrice(message, args);
    default:
      return message.reply(usageError.errorMessage("stocks", "Please provide a valid stock command."));
  }
}

const options = {
  name: "stocks",
  aliases: ["stock"]
};

module.exports = {
  handle,
  options
};