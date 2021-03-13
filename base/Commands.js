const path = require("path");

module.exports = class Command {
  constructor(
    client,
    {
      name = null,
      description = null,
      usage = null,
      examples = null,
      dirname = false,
      aliases = new Array(),
      botPermissions = new Array(),
      memberPermissions = new Array(),
      ownerOnly = false,
      cooldown = 3000,
    }
  ) {
    const category = dirname
      ? dirname.split(path.sep)[
          parseInt(dirname.split(path.sep).length - 1, 10)
        ]
      : "Other";
    this.client = client;
    this.conf = { memberPermissions, botPermissions, ownerOnly, cooldown };
    this.help = { name, category, aliases, description, usage, examples };
  }
};
