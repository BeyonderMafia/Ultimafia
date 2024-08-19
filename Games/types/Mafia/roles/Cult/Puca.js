const Role = require("../../Role");

module.exports = class Puca extends Role {
  constructor(player, data) {
    super("Puca", player, data);

    this.alignment = "Cult";
    this.cards = [
      "VillageCore",
      "WinWithCult",
      "MeetingCult",
      "Endangered",
      "PucaPoison",
    ];
  }
};
