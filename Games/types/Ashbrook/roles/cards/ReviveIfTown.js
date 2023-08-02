const Card = require("../../Card");
const { PRIORITY_NIGHT_REVIVER } = require("../../const/Priority");

module.exports = class ReviveIfTown extends Card {
  constructor(role) {
    super(role);

    this.meetings = {
      Revive: {
        actionName: "Revive",
        states: ["Night"],
        flags: ["voting"],
        targets: { include: ["dead"], exclude: ["alive", "self"] },
        shouldMeet: function () {
          return !this.data.revived;
        },
        action: {
          labels: ["revive"],
          priority: PRIORITY_NIGHT_REVIVER,
          run: function () {
            if (this.dominates()) this.actor.role.data.revived = true;

            if (this.isInsane()) return;

            let dead = this.game.players.filter((p) => p.role.alignment !== "Follower" && p.role.alignment !== "Leader");

            if (dead.indexOf(this.target) > -1){
              this.target.revive("basic", this.actor);
            }
          },
        },
      },
    };
  }
};
