const Command = require("../../base/Commands");
const Discord = require("discord.js");

class Loop extends Command {
  constructor(client) {
    super(client, {
      name: "loop",
      dirname: __dirname,
      description: "Lösche die WarteschlangeWiederholen Sie ein Lied oder eine Warteschlange auf unbestimmte Zeit!",
      usage: "loop/ loop queue",
      examples: "loop",
      aliases: ["repeat", "schleife"],
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

    if (args.join(" ").toLowerCase() === "queue") {
      if (client.player.getQueue(message).loopMode) {
        client.player.setLoopMode(message, false);
        text = `${client.config.emojis.success} Wiederholungsmodus **deaktiviert**!`;
        embed.setDescription(text);
        embed.setColor(client.config.colors.success);

        return message.channel.send(embed);
      } else {
        client.player.setLoopMode(message, true);
        text = `${client.config.emojis.success} Wiederholungsmodus **aktiviert** Die gesamte Warteschlange wird auf unbestimmte Zeit wiederholt!`;
        embed.setDescription(text);
        embed.setColor(client.config.colors.success);

        return message.channel.send(embed);
      }
    } else {
      if (client.player.getQueue(message).repeatMode) {
        client.player.setRepeatMode(message, false);
        text = `${client.config.emojis.success} Wiederholungsmodus **deaktiviert**!`;
        embed.setDescription(text);
        embed.setColor(client.config.colors.success);

        return message.channel.send(embed);
      } else {
        client.player.setRepeatMode(message, true);
        text = `${client.config.emojis.success} Wiederholungsmodus **aktiviert** Die aktuelle Musik wird endlos wiederholt!`;
        embed.setDescription(text);
        embed.setColor(client.config.colors.success);

        return message.channel.send(embed);
      }
    }
  }
}
module.exports = Loop;
