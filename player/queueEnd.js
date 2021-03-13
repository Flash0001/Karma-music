const { MessageEmbed } = require("discord.js");

module.exports = (client, message) => {
  const text = `${client.config.emojis.error} Die Musik wurde gestoppt, weil sich keine Musik mehr in der Warteschlange befindet!`;
  const embed = new MessageEmbed()
    .setDescription(text)
    .setColor(client.config.embed.color);

  message.channel.send(embed);
};
