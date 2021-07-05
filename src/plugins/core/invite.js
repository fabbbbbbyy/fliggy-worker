function handle(message) {
  message.reply({
    embed: {
      description: `Click the link below for Fliggy to join your server!\n**<https://bit.ly/3ypBhtG>**\n`,
      color: "#d6bebe",
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
