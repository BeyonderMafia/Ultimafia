const Item = require("../Item");

module.exports = class Snowstorm extends Item {
  constructor() {
    super("Snowstorm");

    this.cannotBeStolen = true;
    this.cannotBeSnooped = true;

    this.meetings = {
      Snowstorm: {
        actionName: "Done Waiting?",
        states: ["Night"],
        flags: ["group", "speech", "voting", "mustAct", "noVeg"],
        inputType: "boolean",
        passiveDead: true,
        whileDead: true,
        speakDead: true,
      },
    };

    this.listeners = {
      state: function () {
        const state = this.game.getStateName();
        if (state == "Day") {
          this.drop();
          return;
        }

        if (state != "Night") {
          return;
        }

        if (this.holder.role.alignment != "Mafia") {
          this.holder.queueAlert(
            ":sy8b: You're snowed in for the night... you cannot take any action!"
          );
        }
      },
    }
  }

  shouldDisableMeeting(name) {
    // do not disable jailing, gov actions
    if (this.game.getStateName() != "Night") {
      return false;
    }

    if (this.holder.role.alignment == "Mafia") {
      return false;
    }

    return name !== "Snowstorm";
  }

};
