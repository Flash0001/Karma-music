const Command = require("../../base/Commands");
const Discord = require("discord.js");

class FilterList extends Command {
  constructor(client) {
    super(client, {
      name: "filter-list",
      dirname: __dirname,
      description: "Sägt die Liste des Filters.",
      usage: "stop",
      examples: "stop",
      aliases: ["filters"],
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

    const filtersStatuses = [[], []];

    client.filters.forEach((filterName) => {
      const array =
        filtersStatuses[0].length > filtersStatuses[1].length
          ? filtersStatuses[1]
          : filtersStatuses[0];
      array.push(
        filterName.charAt(0).toUpperCase() +
          filterName.slice(1) +
          " : " +
          (client.player.getQueue(message).filters[filterName]
            ? client.emotes.success
            : client.emotes.off)
      );
    });

    message.channel.send({
      embed: {
        color: client.config.embed.color,
        fields: [
          {
            name: "Filter",
            value: filtersStatuses[0].join("\n"),
            inline: true,
          },
          { name: "** **", value: filtersStatuses[1].join("\n"), inline: true },
        ],
        timestamp: new Date(),
        description: `Liste aller aktivierten oder deaktivierten Filter.\nBenutzen \`${client.config.discord.prefix}filter\` um einem Song einen Filter hinzuzufügen.`,
      },
    });
  }
}
module.exports = FilterList;
