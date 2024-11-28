const Card = require("../../Card");
const Random = require("../../../../../lib/Random");
const AllRoles = require("../../../../../data/roles");
const { PRIORITY_BECOME_DEAD_ROLE } = require("../../const/Priority");

module.exports = class BecomeExcessRole extends Card {
  constructor(role) {
    super(role);
    /*
    this.actions = [
      {
        priority: PRIORITY_BECOME_DEAD_ROLE,
        labels: ["convert"],
        run: function () {
          if (this.game.getStateName() != "Night") return;

          if (!this.actor.alive) return;

          let roles = this.game.PossibleRoles.filter((r) => r);
          let players = this.game.players.filter((p) => p.role);
          let currentRoles = [];

          for (let x = 0; x < players.length; x++) {
            currentRoles.push(players[x].role);
          }
          for (let y = 0; y < currentRoles.length; y++) {
            roles = roles.filter(
              (r) =>
                r.split(":")[0] != currentRoles[y].name &&
                (this.game.getRoleAlignment(r) ==
                  this.game.getRoleAlignment(this.actor.role.name) ||
                  this.game.getRoleAlignment(this.actor.role.name) ==
                    "Independent")
            );
          }
          if (roles.length <= 0) {
            if (
              this.game.getRoleAlignment(this.actor.role.name) == "Independent"
            ) {
              roles = Object.entries(AllRoles.Mafia).map(
                (roleData) => roleData[0]
              );
            } else {
              roles = Object.entries(AllRoles.Mafia)
                .filter(
                  (roleData) =>
                    roleData[1].alignment ===
                    this.game.getRoleAlignment(this.actor.role.name)
                )
                .map((roleData) => roleData[0]);
            }
          }

          let newRole = Random.randArrayVal(roles);

          this.actor.setRole(
            newRole,
            undefined,
            false,
            false,
            false,
            "No Change"
          );
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
          priority: PRIORITY_BECOME_DEAD_ROLE,
          labels: ["convert"],
          run: function () {
            if (this.game.getStateName() != "Night") return;

            if (!this.actor.alive) return;

            let roles = this.game.PossibleRoles.filter((r) => r);
            let players = this.game.players.filter((p) => p.role);
            let currentRoles = [];

            for (let x = 0; x < players.length; x++) {
              currentRoles.push(players[x].role);
            }
            for (let y = 0; y < currentRoles.length; y++) {
              roles = roles.filter(
                (r) =>
                  r.split(":")[0] != currentRoles[y].name &&
                  (this.game.getRoleAlignment(r) ==
                    this.game.getRoleAlignment(this.actor.role.name) ||
                    this.game.getRoleAlignment(this.actor.role.name) ==
                      "Independent")
              );
            }
            if (roles.length <= 0) {
              roles = Object.entries(AllRoles.Mafia)
                .filter(
                  (roleData) =>
                    roleData[1].alignment ===
                    this.game.getRoleAlignment(this.actor.role.name)
                )
                .map((roleData) => roleData[0]);
            }

            let newRole = Random.randArrayVal(roles);

            this.actor.setRole(
              newRole,
              undefined,
              false,
              false,
              false,
              "No Change"
            );
          },
        });

        this.game.queueAction(action);
      },
    };
  }
};
