const Card = require("../../Card");
const {
  PRIORITY_INVESTIGATIVE_AFTER_RESOLVE_DEFAULT,
} = require("../../const/Priority");

module.exports = class WatchPlayerBoolean extends Card {
  constructor(role) {
    super(role);

    this.meetings = {
      "Watch (Boolean)": {
        states: ["Night"],
        flags: ["voting"],
        targets: { include: ["alive"], exclude: [] },
        action: {
          labels: ["investigate", "hidden"],
          priority: PRIORITY_INVESTIGATIVE_AFTER_RESOLVE_DEFAULT,
          run: function () {
            let visited = this.hasVisitors(this.target);
            if (this.actor.hasEffect("FalseMode")) {
              if (!visited) {
                this.actor.queueAlert(
                  `:watch: ${this.target.name} was visited by somebody.`
                );
              } else {
                this.actor.queueAlert(
                  `:watch: ${this.target.name} was not visited by anybody.`
                );
              }
            } else {
              if (visited) {
                this.actor.queueAlert(
                  `:watch: ${this.target.name} was visited by somebody.`
                );
              } else {
                this.actor.queueAlert(
                  `:watch: ${this.target.name} was not visited by anybody.`
                );
              }
            }
          },
        },
      },
    };
  }
};
