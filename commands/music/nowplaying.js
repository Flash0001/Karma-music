const Command = require("../../base/Commands");
const Discord = require("discord.js");

class NowPlaying extends Command {
  constructor(client) {
    super(client, {
      name: "nowplaying",
      dirname: __dirname,
      description: "Zeigt das aktuell wiedergegebene Lied an!",
      usage: "np",
      examples: "np",
      aliases: ["np"],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      ownerOnly: false,
      cooldown: 5000,
    });
  }

  async run(message) {
    const client = this.client;
    let text = "";
    const embed = new Discord.MessageEmbed();

    if (!message.member.voice.channel) {
      text = `${client.config.emojis.error} Du bist nicht in einem Sprachkanal!`;
      embed.setDescription(text);
      embed.setColor(client.config.colors.error);

      return message.channel.send(embed);
    }

    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    ) {
      text = `${client.config.emojis.error} Sie befinden sich nicht im selben Sprachkanal!`;
      embed.setDescription(text);
      embed.setColor(client.config.colors.error);

      return message.channel.send(embed);
    }

    if (!client.player.getQueue(message)) {
      text = `${client.config.emojis.error} Derzeit wird keine Musik abgespielt!`;
      embed.setDescription(text);
      embed.setColor(client.config.colors.error);

      return message.channel.send(embed);
    }

    const track = client.player.nowPlaying(message);
    const filters = [];

    Object.keys(client.player.getQueue(message).filters).forEach(
      (filterName) => client.player.getQueue(message).filters[filterName]
    )
      ? filters.push(filterName)
      : false;

    message.channel.send({
      embed: {
        color: client.config.embed.color,
        author: { name: track.title },
        fields: [
          { name: "Kanal", value: track.author, inline: true },
          {
            name: "Angefordert von",
            value: track.requestedBy.username,
            inline: true,
          },
          {
            name: "Aus der Wiedergabeliste",
            value: track.fromPlaylist ? "Ja" : "Nein",
            inline: true,
          },

          {
            name: "Ansichten",
            value: track.views.toLocaleString(),
            inline: true,
          },
          { name: "Dauer", value: track.duration, inline: true },
          {
            name: "Filter aktiviert",
            value: filters.length + "/" + client.config.filters.length,
            inline: true,
          },

          {
            name: "Fortschrittsanzeige",
            value: client.player.createProgressBar(message, {
              timecodes: true,
            }),
            inline: true,
          },
        ],
        thumbnail: { url: track.thumbnail },
        timestamp: new Date(),
      },
    });
  }
}
module.exports = NowPlaying;
