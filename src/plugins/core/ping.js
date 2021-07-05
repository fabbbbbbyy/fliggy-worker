const { infoEmoji } = require("../../helpers/emojis");

function handle(message, args) {
    message
    .reply({emoji: infoEmoji.main, content: "Pong!"})
    .then(pongMessage => {
        const pongTime = pongMessage.createdTimestamp - message.createdTimestamp;
        return pongMessage.edit({
            emoji: infoEmoji.main,
            content: `${pongMessage.content} - Time taken: **${pongTime}ms**`
        });
    })
}

const options = {
    name: "ping"
};

module.exports = {
    handle, 
    options  
};