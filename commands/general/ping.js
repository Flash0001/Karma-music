const Command = require("../../base/Commands");
const Discord = require("discord.js");

class Ping extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      dirname: __dirname,
      description: "Zeigt den Bot-Ping an",
      usage: "ping",
      examples: "ping",
      aliases: [],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      ownerOnly: false,
      cooldown: 5000,
    });
  }

  async run(message, args) {
    const client = this.client;
    let text = "Ping ...";
    const embed = new Discord.MessageEmbed()
      .setDescription(text)
      .setColor(client.config.embed.color);

    message.channel.send(embed).then((m) => {
      text = `Ping ${m.createdTimestamp - message.createdTimestamp}ms`;
      const embed2 = new Discord.MessageEmbed()
        .setDescription(text)
        .setColor(client.config.embed.color);

      m.edit(embed2);
    });
  }
}

module.exports = Ping;
