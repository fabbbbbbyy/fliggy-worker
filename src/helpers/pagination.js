const pagination = require("discord.js-pagination");
const { leftEmoji, rightEmoji } = require("./emojis");

function createMenu(message, pages) {
  const emojis = [leftEmoji.main, rightEmoji.main];
  const timeout = "100000";
  return pagination(message, pages, emojis, timeout);
}

module.exports = createMenu;
