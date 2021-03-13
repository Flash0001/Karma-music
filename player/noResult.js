const { MessageEmbed } = require("discord.js");

module.exports = (client, message, query) => {
  const text = `${client.config.emojis.error} Keine Ergebnisse auf YouTube für ${query} gefunden!`;
  const embed = new MessageEmbed()
    .setDescription(text)
    .setColor(client.config.colors.error);

  message.channel.send(embed);
};
