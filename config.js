require('dotenv').config();

module.exports = {
  token: process.env.TOKEN,
  prefix: "+",
  owner: {
    id: "593259654566510593",
  },
  emojis: {
    off: "🔻 |",
    error: "‼ |",
    queue: "📑 |",
    music: "🎶 |",
    success: "✅ |",
  },
  filters: [
    "8D",
    "gate",
    "haas",
    "phaser",
    "treble",
    "tremolo",
    "vibrato",
    "reverse",
    "karaoke",
    "flanger",
    "mcompand",
    "pulsator",
    "subboost",
    "bassboost",
    "vaporwave",
    "nightcore",
    "normalizer",
    "surrounding",
  ],
  colors: {
    error: "#FF6961",
    success: "#77dd77"
  },
  embed: {
    color: "#FF0000",
    footer: "Music bot",
  },
};
