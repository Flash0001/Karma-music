const { MessageEmbed } = require("discord.js");

module.exports = (client, message) => {
  const text = `${client.config.emojis.error} Die Musik hörte auf, weil ich vom Kanal getrennt wurde!`;

  const embed = new MessageEmbed()
    .setDescription(text)
    .setColor(client.config.colors.error);

  message.channel.send(embed);
};
