const Command = require("../../base/Commands");

class Reload extends Command {
  constructor(client) {
    super(client, {
      name: "reload",
      dirname: __dirname,
      description: "Reloads a command",
      usage: "reload [Command name]",
      examples: "reload play",
      aliases: ["r"],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      ownerOnly: true,
      cooldown: 5000,
    });
  }

  async run(message, args) {
    const command = args[0];
    const cmd =
      this.client.commands.get(command) ||
      this.client.commands.get(this.client.aliases.get(command));

    if (!cmd) return message.channel.send(":x:| Befehl nicht gefunden!");

    await this.client.unloadCommand(cmd.conf.location, cmd.help.name);
    await this.client.loadCommand(cmd.conf.location, cmd.help.name);
    message.channel.send(":zap:| " + cmd.help.name + " Erfolgreich neu geladen!");
  }
}

module.exports = Reload;
