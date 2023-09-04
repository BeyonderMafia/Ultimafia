const Card = require("../../Card");
const { PRIORITY_EFFECT_GIVER_DEFAULT } = require("../../const/Priority");

module.exports = class LeakTargetWhispers extends Card {
  constructor(role) {
    super(role);

    this.meetings = {
      LeakWhispers: {
        actionName: "Leak Whispers",
        states: ["Night"],
        flags: ["voting"],
        targets: { include: ["alive"], exclude: ["Mafia"] },
        action: {
          labels: ["giveEffect", "changeWhisperLeak"],
          priority: PRIORITY_EFFECT_GIVER_DEFAULT,
          run: function () {
            if (this.dominates()) {
              this.target.giveEffect("Leak Whispers", 2);
            }
          },
        },
      },
    };
  }
};
