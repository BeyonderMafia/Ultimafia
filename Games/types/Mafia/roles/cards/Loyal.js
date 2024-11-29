const Card = require("../../Card");
const Player = require("../../../../core/Player");
const Action = require("../../Action");
const { PRIORITY_NIGHT_ROLE_BLOCKER } = require("../../const/Priority");

module.exports = class Loyal extends Card {
  constructor(role) {
    super(role);
/*
    this.actions = [
      {
        priority: PRIORITY_NIGHT_ROLE_BLOCKER - 1,
        labels: ["block", "hidden", "absolute"],
        run: function () {
          if (
            this.game.getStateName() != "Night" &&
            this.game.getStateName() != "Dawn"
          )
            return;

          if (!this.actor.alive) return;

          for (let action of this.game.actions[0]) {
            if (action.hasLabel("absolute")) {
              continue;
            }
            if (action.hasLabel("mafia")) {
              continue;
            }
            if (action.hasLabel("hidden")) {
              continue;
            }

            let toCheck = action.target;
            if (!Array.isArray(action.target)) {
              toCheck = [action.target];
            }

            if (
              action.actors.indexOf(this.actor) != -1 &&
              !action.hasLabel("hidden") &&
              action.target &&
              toCheck[0] instanceof Player
            ) {
              for (let y = 0; y < toCheck.length; y++) {
                if (toCheck[y].role.alignment != this.actor.role.alignment) {
                  if (
                    action.priority > this.priority &&
                    !action.hasLabel("absolute")
                  ) {
                    action.cancelActor(this.actor);
                    break;
                  }
                }
              }
            }
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
          priority: PRIORITY_NIGHT_ROLE_BLOCKER - 1,
          labels: ["block", "hidden", "absolute"],
          run: function () {
            if (!this.actor.alive) return;
  
            for (let action of this.game.actions[0]) {
              if (action.hasLabel("absolute")) {
                continue;
              }
              if (action.hasLabel("mafia")) {
                continue;
              }
              if (action.hasLabel("hidden")) {
                continue;
              }
  
              let toCheck = action.target;
              if (!Array.isArray(action.target)) {
                toCheck = [action.target];
              }
  
              if (
                action.actors.indexOf(this.actor) != -1 &&
                !action.hasLabel("hidden") &&
                action.target &&
                toCheck[0] instanceof Player
              ) {
                for (let y = 0; y < toCheck.length; y++) {
                  if (toCheck[y].role.alignment != this.actor.role.alignment) {
                    if (
                      action.priority > this.priority &&
                      !action.hasLabel("absolute")
                    ) {
                      action.cancelActor(this.actor);
                      break;
                    }
                  }
                }
              }
            }
          },
        });

        this.game.queueAction(action);
      },
    };



  }
};
