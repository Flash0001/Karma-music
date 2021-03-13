const { MessageEmbed } = require("discord.js");

module.exports = (client, message) => {
  const text = `${client.config.emojis.error} Die Musik wurde gestoppt, weil sich niemand auf dem Sprachkanal befindet!`;
  
  const embed = new MessageEmbed()
    .setDescription(text)
    .setColor(client.config.colors.error);

  message.channel.send(embed);
};
