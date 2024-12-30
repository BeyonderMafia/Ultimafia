const Card = require("../../Card");
const { PRIORITY_INVESTIGATIVE_DEFAULT } = require("../../const/Priority");
const { addArticle } = require("../../../../core/Utils");

module.exports = class GuessRole extends Card {
  constructor(role) {
    super(role);

    this.meetings = {
      "Pursue Player": {
        states: ["Night"],
        flags: ["voting"],
        action: {
          priority: PRIORITY_INVESTIGATIVE_DEFAULT - 1,
          run: function () {
            this.actor.role.data.targetPlayer = this.target;
          },
        },
      },
      "Guess Role": {
        states: ["Night"],
        flags: ["voting"],
        inputType: "custom",
        action: {
          labels: ["investigate", "role"],
          priority: PRIORITY_INVESTIGATIVE_DEFAULT,
          run: function () {
            let targetPlayer = this.actor.role.data.targetPlayer;
            
            
            if (targetPlayer) {
              let info = this.game.createInformation(
              "GuessRoleInfo",
              this.actor,
              this.game,
              [targetPlayer],
              [this.target]
            );
            info.processInfo();

            this.actor.queueAlert(`:invest: ${info.getInfoFormated()}`);
              delete this.actor.role.data.targetPlayer;
            }
          },
        },
      },
    };



    this.listeners = {
      roleAssigned: function (player) {
        if (player !== this.player) {
          return;
        }

        this.player.role.data.ConvertOptions = this.game.PossibleRoles.filter(
          (r) => r
        );
      },
      // refresh cooldown
      state: function (stateInfo) {
        if (!stateInfo.name.match(/Night/)) {
          return;
        }
        let guessOptions = this.player.role.data.ConvertOptions;
        //ConvertOptions.push("None");

        this.meetings["Guess Role"].targets = guessOptions;
      },
    };


    
  }
};
