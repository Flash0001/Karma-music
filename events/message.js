const cmdCooldown = {};

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(message) {
    // If the messagr author is a bot
    if (message.author.bot) {
      return;
    }

    // If the member on a guild is invisible or not cached, fetch them.
    if (message.guild && !message.member) {
      await message.guild.members.fetch(message.author.id);
    }

    const client = this.client;

    // Check if the bot was mentionned
    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
      if (message.guild) {
        return message.channel.send(
          `Hello ${message.author.username}, my prefix is ${client.config.prefix}`
        );
      } else {
        return;
      }
    }

    if (message.content === "@someone" && message.guild) {
      return client.commands.get("someone").run(message, null);
    }

    // Gets the prefix
    const prefix = client.config.prefix;

    const args = message.content
      .slice(typeof prefix === "string" ? prefix.length : 0)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();
    let cmd =
      client.commands.get(command) ||
      client.commands.get(client.aliases.get(command));

    if (!cmd) return;

    if (message.guild) {
      let neededPermissions = [];
      if (!cmd.conf.botPermissions.includes("EMBED_LINKS")) {
        cmd.conf.botPermissions.push("EMBED_LINKS");
      }
      cmd.conf.botPermissions.forEach((perm) => {
        if (!message.channel.permissionsFor(message.guild.me).has(perm)) {
          neededPermissions.push(perm);
        }
      });
      if (neededPermissions.length > 0) {
        return message.channel.send(
          "The bot needs the following permissions: " +
            neededPermissions.map((p) => `\`${p}\``).join(", ")
        );
      }
      neededPermissions = [];
      cmd.conf.memberPermissions.forEach((perm) => {
        if (!message.channel.permissionsFor(message.member).has(perm)) {
          neededPermissions.push(perm);
        }
      });
      if (neededPermissions.length > 0) {
        return message.error("misc:MISSING_MEMBER_PERMS", {
          list: neededPermissions.map((p) => `\`${p}\``).join(", "),
        });
      }
    }

    if (cmd.conf.ownerOnly && message.author.id !== client.config.owner.id) {
      return;
    }

    let uCooldown = cmdCooldown[message.author.id];
    if (!uCooldown) {
      cmdCooldown[message.author.id] = {};
      uCooldown = cmdCooldown[message.author.id];
    }
    const time = uCooldown[cmd.help.name] || 0;
    if (time && time > Date.now()) {
      return message.channel.send(
        `You must wait **${Math.ceil(
          (time - Date.now()) / 1000
        )}** second(s) to be able to run this command again!`
      );
    }
    cmdCooldown[message.author.id][cmd.help.name] =
      Date.now() + cmd.conf.cooldown;

    try {
      cmd.run(message, args);
    } catch (e) {
      console.error(e);
      return message.channel.send(
        "Something went wrong... Please retry again later!"
      );
    }
  }
};


