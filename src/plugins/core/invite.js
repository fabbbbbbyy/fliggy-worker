const { MessageButton } = require("discord-buttons");

const button = new MessageButton()
  .setStyle('url')
  .setURL('https://bit.ly/3ypBhtG') 
  .setLabel('Whoosh!'); 

function handle(message, args) {
  message.reply({
    button,
    embed: {
      description: `Just a few steps away from having **Fliggy** online!\n`,
      color: "#d6bebe"
    }
  })
}

const options = {
  name: "invite"
};

module.exports = {
  handle,
  options
};
