import React, { useContext, useEffect } from "react";

import { RoleSearch } from "../../components/Roles";
import { PanelGrid } from "../../components/Basic";

import "../../css/learn.css";
import { SiteInfoContext } from "../../Contexts";
import { hyphenDelimit } from "../../utils";

export default function LearnAshbrook(props) {
  const gameType = "Ashbrook";

  const siteInfo = useContext(SiteInfoContext);

  /*const modifiers = siteInfo.modifiers["Mafia"].map((e) => ({
    name: e.name,
    text: e.description,
    icon: (
      <div
        className={`icon modifier modifier-Mafia-${hyphenDelimit(e.name)}`}
      />
    ),
  }));*/

  useEffect(() => {
    document.title = "Learn Mafia | UltiMafia";
  }, []);

  return (
    <div className="span-panel main">
      <div className="learn">
        <div className="heading">Synopsis</div>
        <div className="paragraphs">
          <div className="paragraph">
            Inspired by{" "}
            <a
              href="https://bloodontheclocktower.com/"
              target="_blank"
            >
              Blood on the Clocktower
            </a>{" "}
            by the Pandemonium Institute.
          </div>
          <div className="paragraph">
            Formerly known as Dawnbrook, the town of Ashbrook was the victim to a catastrophe, 
            driving many residents of the prosperous town away. Believing it to be a sign, 
            some Cultists of Evil were driven to this town, and are led by their leader to try 
            and take over Ashbrook.
          </div>
          <div className="paragraph">
            Each player is either Good or Evil, with Good players being either 
            Villagers or Outcasts, and Evil players being either Followers or Leader.
            Good wins if the Leader is executed, while Evil wins if the Leader is left
            alive and Evil is allowed to prosper.
          </div>
        </div>
        <div className="heading">Roles</div>
        <RoleSearch gameType={gameType} />
        <div className="heading">Mechanics</div>
        <PanelGrid panels={mechanics} />
        <div className="heading">Important Notes for New Players</div>
        <div className="paragraphs">
          <div className="paragraph">
            This game (in its current state) is not too different from Mafia. However a few important differences between Mafia and this game are:
          </div>
          <div className="paragraph">
            - Evil players do not have a shared night meeting and don't know each others roles.
          </div>
          <div className="paragraph">
            - When you are dead, you are a still important for the game. You will have one vote when you die, and after using it, you are no longer able to vote.
          </div>
          <div className="paragraph">
            - Insanity is where you do not have an ability, but you are unaware of this. For example, if you are the Plaguebearer, you will be led to believe that you are another role, or if you are the Fool, Good will not lose if you are condemned.
          </div>
        </div>
      </div>
    </div>
  );
}

var mechanics = [
  {
    name: "Whispers",
    text: "Allow players to privately contact another player in the town meeting. If the whisper leaks then everyone will see it.",
  },
  {
    name: "No Reveal",
    text: "The roles of dead players are not revealed.",
  },
  {
    name: "Insanity",
    text: "Insane players believe that their roles are working, however they are not.",
  },
  {
    name: "Closed Roles",
    text: "Roles for each alignment are randomly chosen from the pool of roles in the setup.",
  },
]
