const Card = require("../../Card");

module.exports = class TownCore extends Card {
  constructor(role) {
    super(role);

    this.meetings = {
      "Casino": {
        states: ["Guess Dice"],
        flags: ["group", "speech"],
        whileDead: true,
        passiveDead: true,
        speakDead: true,
      },
    };
  }
};