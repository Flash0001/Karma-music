const { MessageEmbed } = require("discord.js");

module.exports = (client, error, message, ...args) => {
  let text = "";
  let embed = new MessageEmbed();
  embed.setColor(client.config.colors.error);

  switch (error) {
    case "NotPlaying":
      text = `${client.config.emojis.error} Auf diesem Server wird keine Musik abgespielt!`;
      embed.setDescription(text);

      message.channel.send(embed);
      break;

    case "NotConnected":
      text = `${client.config.emojis.error} Sie sind mit keinem Sprachkanal verbunden!`;
      embed.setDescription(text);

      message.channel.send(embed);
      break;

    case "UnableToJoin":
      text = `${client.config.emojis.error} Ich kann Ihrem Sprachkanal nicht beitreten. Bitte überprüfen Sie meine Berechtigungen!`;
      embed.setDescription(text);

      message.channel.send(embed);
      break;

    case "VideoUnavailable":
      text = `${client.config.emojis.error} ${args[0].title} ist in Ihrem Land nicht verfügbar! Überspringen...`;
      embed.setDescription(text);

      message.channel.send(embed);
      break;

    case "MusicStarting":
      text = `Die Musik beginnt... bitte warten Sie und versuchen Sie es erneut!`;
      embed.setDescription(text);

      message.channel.send(embed);
      break;

    default:
      text = `${client.config.emojis.error} Etwas ist schief gelaufen... Error : ${error}`;
      embed.setDescription(text);

      message.channel.send(embed);
  }
};
