const Item = require("../Item");
const Action = require("../Action");
const { PRIORITY_EFFECT_GIVER_DEFAULT } = require("../const/Priority");

module.exports = class Sceptre extends Item {
  constructor(lifespan) {
    super("Sceptre");

    this.lifespan = lifespan || Infinity;
    this.meetings = {
      Sceptre: {
        actionName: "Seize power?",
        states: ["Day"],
        flags: ["voting"],
        inputType: "boolean",
        action: {
          labels: ["giveEffect"],
          priority: PRIORITY_EFFECT_GIVER_DEFAULT,
          item: this,
          run: function () {
            if (this.target == "No") {
              return;
            } else {
                this.game.queueAlert(`${this.actor.name} reveals their sceptre and seizes control of the gallows!`);
                this.actor.giveEffect("Crowned", this.actor);
                this.item.drop();
            }
          },
        },
      },
    };
  }
};
