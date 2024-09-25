const Role = require("../../Role");

module.exports = class Hider extends Role {
  constructor(player, data) {
    super("Hider", player, data);

    this.alignment = "Mafia";
    this.cards = [
      "VillageCore",
      "WinWithFaction",
      "MeetingFaction",

      "GuessAdversaryKill",
      "AddHideAndSeek",
    ];
    this.roleToGuess = ["Seeker", "Invader"];
    this.meetingMods = {
      "Guess Adversary": {
        actionName: "Guess Seeker",
      },
    };
  }
};
