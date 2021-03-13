const { MessageEmbed } = require("discord.js");

module.exports = (client, message) => {
  const text = `${client.config.emojis.error} Sie haben keine gültige Antwort gegeben ... Bitte senden Sie den Befehl erneut!`;
  const embed = new MessageEmbed()
    .setDescription(text)
    .setColor(client.config.embed.color);

  message.channel.send(embed);
};
