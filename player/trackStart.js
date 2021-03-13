const { MessageEmbed } = require("discord.js");

module.exports = (client, message, track) => {
  const text = `${client.config.emojis.music} Läuft gerade ${track.title} in ${message.member.voice.channel.name} ...`;
  const embed = new MessageEmbed()
    .setDescription(text)
    .setColor(client.config.embed.color)
    .setThumbnail(track.thumbnail);

  message.channel.send(embed);
};
