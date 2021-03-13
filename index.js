const util = require("util");
const fs = require("fs");
const readdir = util.promisify(fs.readdir);

// Load Bot class
const Bot = require("./base/Bot");
const client = new Bot();

const init = async () => {
  // Search for all commands
  const directories = await readdir("./commands/");
  console.log(`Loading a total of ${directories.length} categories.`);
  directories.forEach(async (dir) => {
    const commands = await readdir("./commands/" + dir + "/");
    commands
      .filter((cmd) => cmd.split(".").pop() === "js")
      .forEach((cmd) => {
        const response = client.loadCommand("./commands/" + dir, cmd);
        if (response) {
          console.error(response);
        }
      });
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");
  console.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach((file) => {
    const eventName = file.split(".")[0];
    console.log(`Loading Event: ${eventName}`);
    const event = new (require(`./events/${file}`))(client);
    client.on(eventName, (...args) => event.run(...args));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  // Then we load player events, which will include our message and ready event.
  const playerFiles = await readdir("./player/");
  console.log(`Loading a total of ${evtFiles.length} Player events.`);
  playerFiles.forEach((file) => {
    const playerName = file.split(".")[0];
    console.log(`Loading Player Event: ${playerName}`);
    const player = require(`./player/${file}`);
    client.player.on(playerName, player.bind(null, client));
    delete require.cache[require.resolve(`./player/${file}`)];
  });

  client.login(client.config.token); // Log in to the discord api
};

init();

// if there are errors, log them
client
  .on("disconnect", () => console.warn("Bot is disconnecting..."))
  .on("reconnecting", () => console.log("Bot reconnecting..."))
  .on("error", (e) => console.error(e))
  .on("warn", (info) => console.warn(info));

// if there is an unhandledRejection, log them
process.on("unhandledRejection", (err) => {
  console.error(err);
});
