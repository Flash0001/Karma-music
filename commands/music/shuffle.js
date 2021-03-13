const Command = require("../../base/Commands");
const Discord = require("discord.js");

class Shuffle extends Command {
  constructor(client) {
    super(client, {
      name: "shuffle",
      dirname: __dirname,
      description: "Mische ein Lied.",
      usage: "shuffle",
      examples: "shuffle",
      aliases: ["mischen"],
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

    const success = client.player.shuffle(message);

    if (success) {
      text = `${client.config.emojis.success} - Warteschlange schlurfte **${
        client.player.getQueue(message).tracks.length
      }** Lieder!`;
      embed.setDescription(text);
      embed.setColor(client.config.colors.success);

      return message.channel.send(embed);
    }
  }
}
module.exports = Shuffle;
