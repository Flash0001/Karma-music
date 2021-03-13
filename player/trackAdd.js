const { MessageEmbed } = require("discord.js");

module.exports = (client, message, track) => {
  const text = `${client.config.emojis.music} ${track.title} wurde der Warteschlange hinzugefügt!`;
  const embed = new MessageEmbed()
    .setDescription(text)
    .setColor(client.config.colors.success)
    .setThumbnail(track.thumbnail);

  message.channel.send(embed);
};
