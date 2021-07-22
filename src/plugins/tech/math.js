const usageError = require("../../errors/_correctusage");
const {
    scalesEmoji,
    leftEmoji,
    rightEmoji
} = require("../../helpers/emojis");

function handle(message, args) {
    if (!args) {
        return message.reply(usageError.errorMessage("math"));
    }

    let response;
    try {
        response = eval(args);
    } catch (error) {
        return message.reply("Sorry, please input a valid calculation.");
    }

    return message.reply({
        embed: {
            description: `Here are your evaluation results!\n`,
            url: "https://www.fliggy-bot.com",
            author: {
                name: "Quick Maths!",
                url: "https://www.fliggy-bot.com",
                icon_url: "https://discord.com/assets/04e853004af5d0aad387cef5be7513a0.svg"
            },
            fields: [{
                    name: `**Input**`,
                    value: `${leftEmoji.main} \`${args}\``,
                    inline: true
                },
                {
                    name: `**Output**`,
                    value: `${rightEmoji.main} \`${response}\``,
                    inline: true
                }
            ],
            color: 9160786
        }
    })
}

const options = {
    name: "math",
    aliases: ["calculate", "calc"]
};

module.exports = {
    handle,
    options
};