const { Client, Collection } = require("discord.js");
const { Player } = require("discord-player");
const path = require("path");

// Creates Bot class
class Bot extends Client {
  constructor(options) {
    super(options);
    this.config = require("../config"); // Load the config file
    this.player = new Player(this); // Creates the bot player
    this.commands = new Collection(); // Creates new commands collection
    this.aliases = new Collection(); // Creates new command aliases collection
  }

  // This function is used to load a command and add it to the collection
  loadCommand(commandPath, commandName) {
    try {
      const props = new (require(`.${commandPath}${path.sep}${commandName}`))(
        this
      );
      console.log(`Loading Command: ${props.help.name}. 👌`);
      props.conf.location = commandPath;
      if (props.init) {
        props.init(this);
      }
      this.commands.set(props.help.name, props);
      props.help.aliases.forEach((alias) => {
        this.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  }

  // This function is used to unload a command (you need to load them again)
  async unloadCommand(commandPath, commandName) {
    let command;
    if (this.commands.has(commandName)) {
      command = this.commands.get(commandName);
    } else if (this.aliases.has(commandName)) {
      command = this.commands.get(this.aliases.get(commandName));
    }
    if (!command) {
      return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;
    }
    if (command.shutdown) {
      await command.shutdown(this);
    }
    delete require.cache[
      require.resolve(`.${commandPath}${path.sep}${commandName}.js`)
    ];
    return false;
  }
}

module.exports = Bot;
