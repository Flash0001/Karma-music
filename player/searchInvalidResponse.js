const { MessageEmbed } = require("discord.js");

module.exports = (client, message, tracks, content, collector) => {
  let text = "";
  let embed = new MessageEmbed();

  if (content === "cancel") {
    collector.stop();

    text = `${client.config.emojis.success} Die Auswahl wurde **storniert**!`;
    embed.setDescription(text);
    embed.setColor(client.config.embed.color);

    return message.channel.send(embed);
  } else {
    text = `${client.config.emojis.error} Sie müssen eine gültige Nummer zwischen **1** und **${tracks.length}** senden!`;
    embed.setDescription(text);
    embed.setColor(client.config.colors.error);

    message.channel.send(embed);
  }
};
