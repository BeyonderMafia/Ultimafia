const Card = require("../../Card");

module.exports = class BroadcastMessage extends Card {
  constructor(role) {
    super(role);

    this.listeners = {
      state: function (stateInfo) {
        
        for (let item of this.player.items) {
          if (item.name == "OverturnSpectator") {
            item.meetings["Overturn Vote"].speechAbilities = [
              {
                name: "Cry",
                targets: ["out"],
                targetType: "out",
                verb: "",
              },
            ];
          }
          if (item.name == "JuryDuty") {
            item.meetings["Court"].speechAbilities = [
              {
                name: "Cry",
                targets: ["out"],
                targetType: "out",
                verb: "",
              },
            ];
          }
          if (item.name == "Room" && this.game.RoomOne.includes(this.player)) {
            item.meetings["Room 1"].speechAbilities = [
              {
                name: "Cry",
                targets: ["out"],
                targetType: "out",
                verb: "",
              },
            ];
          }
          if (item.name == "Room" && this.game.RoomTwo.includes(this.player)){
            item.meetings["Room 2"].speechAbilities = [
              {
                name: "Cry",
                targets: ["out"],
                targetType: "out",
                verb: "",
              },
            ];
          }
        }
      },
    };
  }

  speak(message) {
    if (message.abilityName != "Cry") return;

    message.modified = true;
    message.anonymous = true;
    message.prefix = "cries out";
    message.recipients = message.game.players;
    message.parseForReview = this.parseForReview;
  }

  parseForReview(message) {
    message.prefix = "cries out";
    return message;
  }
};
