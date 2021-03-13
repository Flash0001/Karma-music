const Command = require("../../base/Commands");
const Discord = require("discord.js");

class Filter extends Command {
  constructor(client) {
    super(client, {
      name: "filter",
      dirname: __dirname,
      description: "Wenden Sie Filter auf die Musik an",
      usage: "filter [Filtername]",
      examples: "filter nightmare",
      aliases: ["f"],
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

    if (!args[0]) {
      text = `${client.config.emojis.error} Bitte geben Sie einen gültigen Filter ein, um ihn zu aktivieren oder zu deaktivieren!`;
      embed.setDescription(text);
      embed.setColor(client.config.colors.error);

      return message.channel.send(embed);
    }

    const filterToUpdate = client.config.filters.find(
      (x) => x.toLowerCase() === args[0].toLowerCase()
    );

    if (!filterToUpdate) {
      text = `${client.config.emojis.error} Dieser Filter existiert nicht, versuchen Sie es zum Beispiel (nightcore, 8D, Vibrato, Pulsator ...)!`;
      embed.setDescription(text);
      embed.setColor(client.config.colors.error);

      return message.channel.send(embed);
    }

    const filtersUpdated = {};

    filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[
      filterToUpdate
    ]
      ? false
      : true;

    client.player.setFilters(message, filtersUpdated);

    if (filtersUpdated[filterToUpdate]) {
      text = `${client.config.emojis.music} Ich füge den Filter zur Musik hinzu, bitte warten Sie ... Hinweis: Je länger die Musik, desto länger wird es dauern.`;
      embed.setDescription(text);
      embed.setColor(client.config.embed.color);

      message.channel.send(embed);
    } else {
      text = `${client.config.emojis.music} Ich schalte den Filter für die Musik aus, bitte warten Sie ... Hinweis: Je länger die Musik abgespielt wird, desto länger dauert es.`;
      embed.setDescription(text);
      embed.setColor(client.config.embed.color);

      message.channel.send(embed);
    }
  }
}
module.exports = Filter;
