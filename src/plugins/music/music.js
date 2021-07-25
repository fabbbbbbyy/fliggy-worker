const discord = require("discord.js");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const createMenu = require("../../helpers/pagination");
const lyricsFinder = require("lyrics-finder");
const usageError = require("../../errors/_correctusage");
const { radioEmoji, leftEmoji, rightEmoji } = require("../../helpers/emojis");

const queue = new Map();

async function handle(message, args, client) {
  if (!args) {
    return message.reply(usageError.errorMessage("music"));
  }

  const commandWord = args.split(" ")[0];

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    return message.reply(
      "You have to be in a **voice channel** to play music."
    );
  }

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT")) {
    return message.reply(
      "You don't have the correct permissions for this voice channel."
    );
  } else if (!permissions.has("SPEAK")) {
    return message.reply(
      "You don't have the correct permissions for this voice channel."
    );
  }

  const serverQueue = queue.get(message.guild.id);

  if (commandWord === "play") {
    let song = {};
    const splitArgs = args.split(" ");
    if (splitArgs.length <= 1) {
      return message.reply(usageError.errorMessage("music"));
    }
    let possibleSearchTerms = splitArgs[1];
    for (let i = 2; i < splitArgs.length; i++) {
      possibleSearchTerms += " " + splitArgs[i];
    }

    if (ytdl.validateURL(possibleSearchTerms)) {
      const songInfo = await ytdl.getInfo(possibleSearchTerms);
      song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
      };
    } else {
      const videoFinder = async (query) => {
        const videoResult = await ytSearch(query);
        return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
      };

      const video = await videoFinder(possibleSearchTerms);
      if (video) {
        song = { title: video.title, url: video.url };
      } else {
        return message.reply(
          "We couldn't find anything. Try being more specific."
        );
      }
    }

    if (!serverQueue) {
      const queueConstructor = {
        voiceChannel: voiceChannel,
        textChannel: message.channel,
        connection: null,
        songs: []
      };

      queue.set(message.guild.id, queueConstructor);
      queueConstructor.songs.push(song);

      try {
        const connection = await voiceChannel.join();
        queueConstructor.connection = connection;
        videoPlayer(message.guild, queueConstructor.songs[0]);
      } catch (err) {
        queue.delete(message.guild.id);
        return message.reply("There was an error connecting to Fliggy.");
      }
    } else {
      serverQueue.songs.push(song);
      return message.reply(`**${song.title}** has been added to the queue.`);
    }
  } else if (commandWord === "skip") {
    if (!serverQueue) {
      return message.reply(
        "There are currently no songs in the music queue to skip."
      );
    }
    skipSong(message, serverQueue);
  } else if (commandWord === "stop") {
    if (!serverQueue) {
      return message.reply(
        "There are currently no songs in the music queue to stop."
      );
    }
    stopSong(message, serverQueue);
  } else if (commandWord === "pause") {
    if (!serverQueue) {
      return message.reply(
        "There are currently no songs in the music queue to pause."
      );
    }
    pauseSong(message, serverQueue);
  } else if (commandWord === "resume") {
    if (!serverQueue) {
      return message.reply(
        "There are currently no songs in the music queue to resume."
      );
    }
    resumeSong(message, serverQueue);
  } else if (commandWord === "queue") {
    if (!serverQueue) {
      return message.reply("There are currently no songs in the music queue.");
    }
    showQueue(message, serverQueue);
  } 
  // else if (commandWord === "lyrics") {
  //   if (!serverQueue) {
  //     return message.reply("There are currently no songs in the music queue.");
  //   }
  //   showLyrics(message, serverQueue);
  // }

  client.on('voiceStateUpdate', (oldState, newState) => {
    // check if someone connects or disconnects
    if (oldState.channelID === null || typeof oldState.channelID == 'undefined') return;
    // check if the bot is disconnecting
    if (newState.id !== client.user.id) return;
    // clear the queue
    return queue.delete(oldState.guild.id);
    
  });
}

const videoPlayer = async (guild, song) => {
  const songQueue = queue.get(guild.id);
  if (!song) {
    songQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const stream = ytdl(song.url, { filter: "audioonly" });
  songQueue.connection
    .play(stream, { seek: 0, volume: 0.5 })
    .on("finish", () => {
      songQueue.songs.shift();
      videoPlayer(guild, songQueue.songs[0]);
    });

  await songQueue.textChannel.send(`${radioEmoji.main} Now playing **${song.title}**!`);
};

const skipSong = (message, serverQueue) => {
  if (!message.member.voice.channel) {
    return message.reply(
      "You have to be in a **voice channel** to execute this command."
    );
  }
  serverQueue.connection.dispatcher.end();
};

const stopSong = (message, serverQueue) => {
  if (!message.member.voice.channel) {
    return message.reply(
      "You have to be in a **voice channel** to execute this command."
    );
  }
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
};

const pauseSong = async (message, serverQueue) => {
  if (!message.member.voice.channel) {
    return message.reply(
      "You have to be in a **voice channel** to execute this command."
    );
  }
  if (serverQueue.connection.dispatcher.paused) {
    return message.reply(
        "The music track is already paused, did you mean to resume it?"
      );
  }
  serverQueue.connection.dispatcher.pause();
  return message.reply(
    "Successfully paused Fliggy's stream of music."
  );
};

const resumeSong = async (message, serverQueue) => {
    if (!message.member.voice.channel) {
        return message.reply(
          "You have to be in a **voice channel** to execute this command."
        );
      }
      if (serverQueue.connection.dispatcher.resumed) {
        return message.reply(
            "The music track is not paused, did you mean to pause it?"
          );
      }
      serverQueue.connection.dispatcher.resume();
      return message.reply(
        `Successfully resumed Fliggy's stream of music. \n${radioEmoji.main} Now playing **${serverQueue.songs[0].title}**!`
      );
};

const showQueue = (message, serverQueue) => {
  if (!message.member.voice.channel) {
    return message.reply(
      "You have to be in a **voice channel** to execute this command."
    );
  }
  if (serverQueue.songs.length <= 0) {
    return message.reply(
        "There are currently no songs in the music queue."
      );
  }

  let counter = 1;
  const numEmbeds = Math.ceil(serverQueue.songs.length / 10);
  const pages = [];

  for (let i = 0; i < numEmbeds; i++) {
    const fields = [];
    const startIdx = counter - 1;
    let endIdx = startIdx + 10;
    if (i == numEmbeds - 1) {
      endIdx = serverQueue.songs.length;
    }
    for (let j = startIdx; j < endIdx; j++) {
      fields.push({
        name: `**${counter}.** ${serverQueue.songs[j].title}`,
        value: serverQueue.songs[j].url
      });
      counter++;
    }
    const embed = new discord.MessageEmbed()
    .setDescription("Here is the current music queue.\n")
    .setColor(9160786)
    .setThumbnail("https://cdn.discordapp.com/attachments/861239068401860660/862254178637709342/2465301.png")
    .addFields(
      fields
    );
    pages.push(embed);
  }

  return createMenu(message, pages);
};

const options = {
  name: "music",
};

module.exports = {
  handle,
  options,
};
