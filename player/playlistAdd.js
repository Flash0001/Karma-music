const { MessageEmbed } = require("discord.js");

module.exports = (client, message, playlist) => {
  const text = `${client.config.emojis.music} ${playlist.title} wurde der Warteschlange hinzugefügt (**${playlist.tracks.length}** Lieder) !`;
  const embed = new MessageEmbed()
    .setThumbnail(playlist.thumbnail)
    .setDescription(text)
    .setColor(client.config.colors.success);

  message.channel.send(embed);
};
