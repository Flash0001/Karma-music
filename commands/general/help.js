const Command = require("../../base/Commands");
const Discord = require("discord.js");

class Help extends Command {
  constructor(client) {
    super(client, {
      name: "help",
      dirname: __dirname,
      description: "Zeigt die Befehlsliste an",
      usage: "help / mhelp [Befehl]",
      examples: "help / help play",
      aliases: ["h", "commands", "hilfe"],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      ownerOnly: false,
      cooldown: 5000,
    });
  }

  async run(message, args) {
    // if a command is provided
    if (args[0]) {
      // if the command doesn't exist, error message
      const cmd =
        this.client.commands.get(args[0]) ||
        this.client.commands.get(this.client.aliases.get(args[0]));

      const description = `${cmd.help.description || "No defined"}`;
      const usage = `${cmd.help.usage || "No defined"}`;
      const examples = `${cmd.help.examples || "No defined"}`;

      // Creates the help embed
      const groupEmbed = new Discord.MessageEmbed()
        .setAuthor(cmd.help.name.toUpperCase())
        .addField("Beschreibung", description)
        .addField("Verwendung", usage)
        .addField("Beispiele", examples)
        .addField(
          "Aliase",
          cmd.help.aliases.length > 0
            ? cmd.help.aliases.map((a) => "`" + a + "`").join("\n")
            : "No Alias"
        )
        .addField(
          "Berechtigungen",
          cmd.conf.memberPermissions.length > 0
            ? cmd.conf.memberPermissions.map((p) => "`" + p + "`").join("\n")
            : "Berechtigungen nicht erforderlich"
        )
        .setColor(this.client.config.embed.color)
        .setFooter(this.client.config.embed.footer);

      // and send the embed in the current channel
      return message.channel.send(groupEmbed);
    }

    const categories = [];
    const commands = this.client.commands;

    commands.forEach((command) => {
      if (!categories.includes(command.help.category)) {
        if (
          command.help.category === "Owner" &&
          !this.client.config.owner.id.includes(message.author.id)
        ) {
          return;
        }
        categories.push(command.help.category);
      }
    });

    const embed = new Discord.MessageEmbed()
      .setDescription(
        "Holen Sie sich Hilfe zu einem bestimmten Befehl, Art: `" +
          this.client.config.prefix +
          "help <Befehl>`"
      )
      .setColor(this.client.config.embed.color)
      .setFooter(this.client.config.embed.footer);
    categories.sort().forEach((cat) => {
      const tCommands = commands.filter((cmd) => cmd.help.category === cat);
      embed.addField(
        "🎛 " + cat,
        tCommands.map((cmd) => "`" + cmd.help.name + "`").join("  ")
      );
    });

    embed.setAuthor(
      this.client.user.username,
      this.client.user.displayAvatarURL()
    );
    return message.channel.send(embed);
  }
}

module.exports = Help;
