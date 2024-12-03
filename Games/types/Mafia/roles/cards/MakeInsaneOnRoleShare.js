const Card = require("../../Card");
const Action = require("../../Action");
const { PRIORITY_OVERTHROW_VOTE } = require("../../const/Priority");

module.exports = class MakeInsaneOnRoleShare extends Card {
  constructor(role) {
    super(role);

    this.listeners = {
      ShareRole: function (PlayerA, PlayerB, isAlignmentShare) {
        if (
          (PlayerA == this.player || PlayerB == this.player) &&
          !isAlignmentShare
        ) {
          let thisPlayer;
          let otherPlayer;
          if (PlayerA == this.player) {
            thisPlayer = PlayerA;
            otherPlayer = PlayerB;
          } else {
            thisPlayer = PlayerB;
            otherPlayer = PlayerA;
          }
          var action = new Action({
            actor: this.player,
            target: otherPlayer,
            game: this.game,
            item: this,
            labels: ["hidden"],
            run: function () {
              if (this.dominates(this.target)) {
                /*
                this.target.queueAlert(
                  `Your feeling S after Role Sharing with ${this.actor.name}`
                );
                */
                this.target.giveEffect("Insanity");
              }
            },
          });
          this.game.instantAction(action);
        }
      },
    };
  }
};
