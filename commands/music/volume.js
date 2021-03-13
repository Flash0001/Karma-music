const Command = require("../../base/Commands");
const Discord = require("discord.js");

class Volume extends Command {
  constructor(client) {
    super(client, {
      name: "volume",
      dirname: __dirname,
      description: "Ändert die Lautstärke des Songs.",
      usage: "volume [1-100]",
      examples: "volume 10",
      aliases: ["v"],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      ownerOnly: false,
      cooldown: 5000,
    });
  }

  async run(message, args) {
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

    if (!args[0] || isNaN(args[0])) {
      text = `${client.config.emojis.error} Bitte geben Sie eine gültige Nummer ein!`;
      embed.setDescription(text);
      embed.setColor(client.config.colors.error);

      return message.channel.send(embed);
    }

    if (
      Math.round(parseInt(args[0])) < 1 ||
      Math.round(parseInt(args[0])) > 100
    ) {
      text = `${client.config.emojis.error} Bitte geben Sie eine gültige Nummer ein (zwischen 1 und 100)!`;
      embed.setDescription(text);
      embed.setColor(client.config.colors.error);

      return message.channel.send(embed);
    }

    const success = client.player.setVolume(message, parseInt(args[0]));

    if (success) {
      text = `${client.config.emojis.success} Lautstärke auf **${parseInt(
        args[0]
      )}%** eingestellt!`;
      embed.setDescription(text);
      embed.setColor(client.config.colors.success);

      return message.channel.send(embed);
    }
  }
}
module.exports = Volume;
