const Command = require("../../base/Commands");
const Discord = require("discord.js");

class ClearQueue extends Command {
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

    if (client.player.getQueue(message).tracks.length <= 1) {
      text = `${client.config.emojis.error} Es gibt nur ein Lied in der Warteschlange.`;
      embed.setDescription(text);
      embed.setColor(client.config.colors.error);

      return message.channel.send(embed);
    }

    client.player.clearQueue(message);

    text = `${client.config.emojis.success} Die Warteschlange wurde gerade **entfernt**!`;
    embed.setDescription(text);
    embed.setColor(client.config.colors.success);

    message.channel.send(embed);
  }
}
module.exports = ClearQueue;
