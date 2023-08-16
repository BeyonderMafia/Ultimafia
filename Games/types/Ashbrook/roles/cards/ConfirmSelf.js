const Card = require("../../Card");
const { PRIORITY_INVESTIGATIVE_DEFAULT } = require("../../const/Priority");

module.exports = class ConfirmSelf extends Card {
  constructor(role) {
    super(role);

    this.meetings = {
      "Reveal Identity": {
        states: ["Night"],
        flags: ["voting"],
        action: {
          labels: ["investigate", "role"],
          priority: PRIORITY_INVESTIGATIVE_DEFAULT,
          run: function () {
            if (this.isInsane()) return;

            var role = this.actor.getAppearance("investigate", true);
            var alert = `:sy2i: You learn that ${this.actor.name}'s role is ${role}.`;
            this.target.queueAlert(alert);
          },
        },
      },
    };
  }
};
