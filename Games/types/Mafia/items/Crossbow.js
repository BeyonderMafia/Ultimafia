const Item = require("../Item");
const Random = require("../../../../lib/Random");

module.exports = class Crossbow extends Item {
  constructor(options) {
    super("Crossbow");

    this.reveal = options?.reveal;
    this.shooterMask = options?.shooterMask;
    this.cursed = options?.cursed;

    this.baseMeetingName = "Fire Crossbow";
    this.currentMeetingIndex = 0;

    this.meetings = {
      [this.baseMeetingName]: {
        actionName: "Shoot",
        states: ["Day"],
        flags: ["voting", "instant", "noVeg"],
        action: {
          labels: ["kill", "crossbow"],
          item: this,
          run: function () {
            this.item.drop();
            //this.game.broadcast("gunshot");

            var shooterMask = this.item.shooterMask;
            var reveal = shooterMask ? true : this.item.reveal;
            if (reveal == null) {
              reveal = Random.randArrayVal([true, false]);
            }
            if (shooterMask == null) {
              shooterMask = this.actor.name;
            }
            var cursed = this.item.cursed;

            if (cursed) {
              this.target = this.actor;
            }

            if(this.game.getRoleAlignment(this.target.getRoleAppearance().split(" (")[0]) == "Village" || this.game.getRoleAlignment(this.target.getRoleAppearance().split(" (")[0]) == "Independent"){
              this.actor.queueAlert(
                `Your target was not evil so Your Crossbow did nothing!`
              );
              return;
            }

            if (reveal && cursed){
              this.actor.queueAlert(
                `Your target was not evil so Your Crossbow did nothing!`
              );
              return;
            }
            else if (reveal && !cursed){
              this.game.queueAlert(
                `:gun: ${shooterMask} pulls a Crossbow and shoots at ${this.target.name}!`
              );
            }
            else
              this.game.queueAlert(
                `:gun: Someone fires a Crossbow at ${this.target.name}!`
              );

            if (this.dominates()) {
              this.target.kill("gun", this.actor, true);
            }


            
          },
        },
      },
    };
  }

  get snoopName() {
    return this.name;
  }

  getMeetingName(idx) {
    return `${this.id} ${idx}`;
  }

  getCurrentMeetingName() {
    if (this.currentMeetingIndex === 0) {
      return this.baseMeetingName;
    }

    return this.getMeetingName(this.currentMeetingIndex);
  }

  // increase meeting name index to ensure each meeting name is unique
  incrementMeetingName() {
    let mtg = this.meetings[this.getCurrentMeetingName()];
    delete this.meetings[this.getCurrentMeetingName()];
    this.currentMeetingIndex += 1;
    this.meetings[this.getCurrentMeetingName()] = mtg;
  }
};
