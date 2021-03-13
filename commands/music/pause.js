const Command = require("../../base/Commands");
const Discord = require("discord.js");

class Pause extends Command {
  constructor(client) {
    super(client, {
      name: "clear-queue",
      dirname: __dirname,
      description: "Lösche die Warteschlange!",
      usage: "cq",
      examples: "cq",
      aliases: ["cq"],
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

    if (client.player.getQueue(message).paused) {
      text = `${client.config.emojis.error} Die Musik hat bereits pausiert!`;
      embed.setDescription(text);
      embed.setColor(client.config.colors.error);

      return message.channel.send(embed);
    }

    const success = client.player.pause(message);

    if (success) {
      text = `${client.config.emojis.success} - Song ${
        client.player.getQueue(message).playing.title
      } pausiert!`;
      embed.setDescription(text);
      embed.setColor(client.config.colors.success);

      message.channel.send(embed);
    }
  }
}
module.exports = Pause;
