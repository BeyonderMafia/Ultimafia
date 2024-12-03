const Card = require("../../Card");
const Random = require("../../../../../lib/Random");
const Action = require("../../Action");
const { PRIORITY_INVESTIGATIVE_DEFAULT } = require("../../const/Priority");

module.exports = class CountVisitors extends Card {
  constructor(role) {
    super(role);
    /*
    this.actions = [
      {
        priority: PRIORITY_INVESTIGATIVE_DEFAULT,
        labels: ["hidden", "absolute"],
        run: function () {
          if (this.game.getStateName() !== "Night") return;

          let visitors = this.actor.role.data.visitors;
          if (visitors) {
            let unique = new Set(visitors);

            if (this.actor.hasEffect("FalseMode")) {
              let num = 0;
              if (unique.size == 0) num = 1;
              else num = 0;
              this.actor.queueAlert(
                `:visited: You were visited by ${num} people last night.`
              );
              return;
            }

            this.actor.queueAlert(
              `:visited: You were visited by ${unique.size} people last night.`
            );
          }
        },
      },
    ];
*/
    this.listeners = {
      state: function (stateInfo) {
        if (!this.player.alive) {
          return;
        }
        if (!stateInfo.name.match(/Night/)) {
          return;
        }

        var action = new Action({
          actor: this.player,
          game: this.player.game,
          priority: PRIORITY_INVESTIGATIVE_DEFAULT,
          labels: ["hidden", "absolute"],
          run: function () {
            let visitors = this.actor.role.data.visitors;
            if (visitors) {
              let unique = new Set(visitors);

              if (this.actor.hasEffect("FalseMode")) {
                let num = 0;
                if (unique.size == 0) num = 1;
                else num = 0;
                this.actor.queueAlert(
                  `:visited: You were visited by ${num} people last night.`
                );
                return;
              }

              this.actor.queueAlert(
                `:visited: You were visited by ${unique.size} people last night.`
              );
            }
          },
        });

        this.game.queueAction(action);
      },
    };
  }
};
