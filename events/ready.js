module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run() {
    const client = this.client;

    // Logs bot ready!
    console.log(`Loading a total of ${client.commands.size} command(s).`);
    console.log(`${client.user.tag} is  ready!!`);

    // Set activity
    const version = require("../package.json").version;

    client.user.setActivity(`Music | v${version}`, { type: "PLAYING" });
  }
};
