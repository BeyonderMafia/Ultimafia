const Card = require("../../Card");
const Action = require("../../Action");
const { PRIORITY_KILL_DEFAULT } = require("../../const/Priority");

module.exports = class RedirectKill extends Card {
  constructor(role) {
    super(role);

    this.redirectedKill = false;

    this.meetings = {
      "Redirect Kill to": {
        states: ["Night"],
        flags: ["voting", "mustAct"],
        action: {
          priority: PRIORITY_KILL_DEFAULT - 1,
          run: function () {
            if (this.isInsane()) return;
            if (this.actor.role.redirectedKill) return;

            if (this.target.role.alignment !== "Villager" && this.target.role.alignment !== "Outcast") return;
            this.actor.role.redirectKillTarget = this.target;
          },
        },
      },
    };

    this.actions = [
      {
        labels: ["hidden", "absolute"],
        priority: PRIORITY_MAFIA_KILL - 2,
        run: function () {
          if (this.game.getStateName() === "Night")
            delete this.actor.role.redirectKillTarget;
        },
      },
    ];

    this.immunity["kill"] = Infinity;
    this.listeners = {
      immune: function (action) {
        if (action.target !== this.player) {
          return;
        }

        if (!action.hasLabel("kill")) {
          return;
        }

        let toKill = this.player;
        let chosenRedirect = this.player.role.redirectKillTarget;
        if (chosenRedirect) {
          this.redirectedKill = true;
          toKill = chosenRedirect;
        }

        delete this.immunity["kill"];
        let killAction = new Action({
          // do not add gun label
          labels: ["kill"],
          actor: action.actor,
          target: toKill,
          game: this.player.game,
          run: function () {
            if (this.dominates()) {
              this.target.kill("basic", this.actor);
            }
          },
        });
        killAction.do();
        this.immunity["kill"] = Infinity;
      },
    };
  }
};
