const Role = require("../../Role");

module.exports = class InsaneCop extends Role {
  constructor(player, data) {
    super("Insane Cop", player, data);

    this.alignment = "Village";
    this.cards = [
      "VillageCore",
      "WinWithVillage",
      "AlignmentLearner",
      "AppearAsCop",
    ];
    this.immunity["insanity"] = 1;
  }
};
