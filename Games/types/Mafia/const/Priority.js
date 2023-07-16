// PRIORITY IS RESOLVED FROM LOWEST NUMBER (-101) TO HIGHEST NUMBER (100)

// WINCHECK PRIORITY
const PRIORITY_WIN_IF_CONDEMNED = -10;
const PRIORITY_WIN_BY_CONDEMNING = -10;
const PRIORITY_WIN_CHECK_DEFAULT = 0;

// NIGHT PRIORITY
const PRIORITY_IDENTITY_STEALER_BLOCK = -200;

const PRIORITY_UNTARGETABLE = -180;
const PRIORITY_MODIFY_ACTION_LABELS = -120;

const PRIORITY_REDIRECT_ACTION = -100;
const PRIORITY_STEAL_ACTIONS = -99;
const PRIORITY_SWAP_VISITORS_A = -98;
const PRIORITY_SWAP_VISITORS_B_AND_SWAP = -97;
const PRIORITY_BLOCK_VISITORS = -96;
const PRIORITY_NIGHT_ROLE_BLOCKER = -95;
const PRIORITY_NIGHT_NURSE = -95;
const PRIORITY_MODIFY_ACTION = -94;

const PRIORITY_CLEANSE_LYCAN_VISITORS = -92;
const PRIORITY_KILL_WEREWOLF_VISITORS_ENQUEUE = -92;
const PRIORITY_VISITORS_ENQUEUE = -92;

const PRIORITY_NIGHT_SAVER = -90;

const PRIORITY_MESSAGE_GIVER_DEFAULT = -55;
const PRIORITY_CONFIRM_SELF = PRIORITY_MESSAGE_GIVER_DEFAULT;

const PRIORITY_MODIFY_INVESTIGATIVE_RESULT_DEFAULT = -50;
const PRIORITY_REVEAL_TARGET_ON_DEATH =
  PRIORITY_MODIFY_INVESTIGATIVE_RESULT_DEFAULT;
const PRIORITY_MODIFY_ALIGNMENT = PRIORITY_MODIFY_INVESTIGATIVE_RESULT_DEFAULT;

const PRIORITY_BITING_WOLF = -50;

const PRIORITY_ITEM_GIVER_DEFAULT = -50;
const PRIORITY_EFFECT_GIVER_DEFAULT = -50;
const PRIORITY_ITEM_TAKER_DEFAULT = -45;
const PRIORITY_EFFECT_REMOVER_DEFAULT = -45;

const PRIORITY_INVESTIGATIVE_DEFAULT = -10;

const PRIORITY_MIMIC_ROLE = -5;
const PRIORITY_SWAP_ROLES = -4;
const PRIORITY_CONVERT_DEFAULT = -3;

const PRIORITY_CLEAN_DEATH = -3;
const PRIORITY_IDENTITY_STEALER = -2;

const PRIORITY_CULT_CONVERT = -2;
const PRIORITY_MASON_CONVERT = -2;
const PRIORITY_MAFIA_KILL = -1;

const PRIORITY_KILL_DEFAULT = 0;
const PRIORITY_KILL_LYCAN_VISITORS = PRIORITY_KILL_DEFAULT;

const PRIORITY_NIGHT_REVIVER = 1;

const PRIORITY_BECOME_DEAD_ROLE = 50;

const PRIORITY_INVESTIGATIVE_AFTER_RESOLVE_DEFAULT = 100;

// DAY PRIORITY
const PRIORITY_OVERTHROW_VOTE = -20;
const PRIORITY_SUNSET_DEFAULT = -10;
const PRIORITY_VILLAGE_MEETING = 0;
const PRIORITY_DAY_DEFAULT = 0;

// LEADER PRIORITY
const PRIORITY_LEADER_DEFAULT = 1;
const PRIORITY_LEADER_DISGUISER = PRIORITY_LEADER_DEFAULT;
const PRIORITY_LEADER_NINJA = 2;

module.exports = {
  // WINCHECK PRIORITY
  PRIORITY_WIN_CHECK_DEFAULT,
  PRIORITY_WIN_IF_CONDEMNED,
  PRIORITY_WIN_BY_CONDEMNING,

  // NIGHT PRIORITY
  PRIORITY_IDENTITY_STEALER_BLOCK,

  PRIORITY_UNTARGETABLE,
  PRIORITY_MODIFY_ACTION_LABELS,
  PRIORITY_MODIFY_ACTION,

  PRIORITY_REDIRECT_ACTION,
  PRIORITY_STEAL_ACTIONS,
  PRIORITY_SWAP_VISITORS_A,
  PRIORITY_SWAP_VISITORS_B_AND_SWAP,
  PRIORITY_NIGHT_ROLE_BLOCKER,
  PRIORITY_NIGHT_NURSE,
  PRIORITY_BLOCK_VISITORS,
  PRIORITY_CLEANSE_LYCAN_VISITORS,
  PRIORITY_KILL_WEREWOLF_VISITORS_ENQUEUE,
  PRIORITY_VISITORS_ENQUEUE,
  PRIORITY_NIGHT_SAVER,

  PRIORITY_BITING_WOLF,

  PRIORITY_MESSAGE_GIVER_DEFAULT,
  PRIORITY_CONFIRM_SELF,

  PRIORITY_MODIFY_INVESTIGATIVE_RESULT_DEFAULT,
  PRIORITY_REVEAL_TARGET_ON_DEATH,
  PRIORITY_MODIFY_ALIGNMENT,

  PRIORITY_ITEM_GIVER_DEFAULT,
  PRIORITY_EFFECT_GIVER_DEFAULT,
  PRIORITY_ITEM_TAKER_DEFAULT,
  PRIORITY_EFFECT_REMOVER_DEFAULT,

  PRIORITY_INVESTIGATIVE_DEFAULT,

  PRIORITY_MIMIC_ROLE,
  PRIORITY_SWAP_ROLES,
  PRIORITY_CONVERT_DEFAULT,

  PRIORITY_CLEAN_DEATH,
  PRIORITY_IDENTITY_STEALER,

  PRIORITY_CULT_CONVERT,
  PRIORITY_MASON_CONVERT,
  PRIORITY_MAFIA_KILL,

  PRIORITY_KILL_DEFAULT,

  PRIORITY_NIGHT_REVIVER,

  PRIORITY_BECOME_DEAD_ROLE,

  PRIORITY_INVESTIGATIVE_AFTER_RESOLVE_DEFAULT,

  // DAY PRIORITY
  PRIORITY_OVERTHROW_VOTE,
  PRIORITY_SUNSET_DEFAULT,
  PRIORITY_VILLAGE_MEETING,
  PRIORITY_DAY_DEFAULT,

  // LEADER PRIORITY
  PRIORITY_LEADER_DEFAULT,
  PRIORITY_LEADER_DISGUISER,
  PRIORITY_LEADER_NINJA,
};
