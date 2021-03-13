const Command = require("../../base/Commands");
const Discord = require("discord.js");

class Queue extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      dirname: __dirname,
      description: "Zeigt die Serverwarteschlange an",
      usage: "queue",
      examples: "queue",
      aliases: ["q"],
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

    const queue = client.player.getQueue(message);

    text =
      `**Serverwarteschlange - ${message.guild.name} ${
        client.config.emojis.queue
      } ${
        client.player.getQueue(message).loopMode ? "(geloopt)" : ""
      }**\nJetziges Lied: ${queue.playing.title} | ${
        queue.playing.author
      }\n\n` +
      (queue.tracks
        .map((track, i) => {
          return `**#${i + 1}** - ${track.title} | ${
            track.author
          } (angefordert von: ${track.requestedBy.username})`;
        })
        .slice(0, 5)
        .join("\n") +
        `\n\n${
          queue.tracks.length > 5
            ? `Und **${queue.tracks.length - 5}** andere Songs...`
            : `In der Wiedergabeliste **${queue.tracks.length}** Lieder...`
        }`);
    embed.setDescription(text);
    embed.setColor(client.config.embed.color);

    return message.channel.send(embed);
  }
}
module.exports = Queue;
