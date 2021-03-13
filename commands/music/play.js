const Command = require("../../base/Commands");
const Discord = require("discord.js");s

class Play extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      dirname: __dirname,
      description: "Spiel ein Lied.",
      usage: "play [Liedtitel/URL]",
      examples: "play Believer",
      aliases: ["p"],
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
      text = `${client.config.emojis.error} Sie befinden sich nicht in einem Sprachkanal!`;
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

    if (!args[0]) {
      text = `${client.config.emojis.error} Bitte geben Sie den Titel eines Songs ein!`;
      embed.setDescription(text);
      embed.setColor(client.config.colors.error);

      return message.channel.send(embed);
    }

    client.player.play(message, args.join(" "), { firstResult: true });
  }
}
module.exports = Play;
