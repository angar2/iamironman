export enum ImageTexture {
  BACKGROUND = 'background',
  IRONMAN_NORMAL = 'ironmanNormal',
  IRONMAN_REPULSOR = 'ironmanRepulsor',
  IRONMAN_HIT = 'ironmanHit',
  IRONMAN_GATHER = 'ironmanGather',
  IRONMAN_BEAM = 'ironmanBeam',
  ULTRON1_NORMAL = 'ultron1Normal',
  ULTRON1_ATTACK = 'ultron1Attack',
  ULTRON2_NORMAL = 'ultron2Normal',
  ULTRON2_ATTACK = 'ultron2Attack',
  ULTRON3_NORMAL = 'ultron3Normal',
  ROCK_NORMAL = 'rockNormal',
  REPULSOR = 'repulsor',
  BEAM = 'beam',
  ULTRON_REPULSOR = 'ultronRepulsor',
  HEALTH = 'health',
}

export enum IronmanMode {
  NORMAL = 'normal',
  REPULSOR = 'repulsor',
  HIT = 'hit',
  GATHER = 'gather',
  BEAM = 'beam',
}

export enum EnemyType {
  ULTRON1 = 'ultron1',
  ULTRON2 = 'ultron2',
  ULTRON3 = 'ultron3',
  ROCK = 'rock',
}

export enum EnemyMode {
  NORMAL = 'normal',
  ATTACK = 'attack',
}

export enum WeaponType {
  REPULSOR = 'repulsor',
  BEAM = 'beam',
  ULTRON_REPULSOR = 'ultronRepulsor',
}

export enum HandlerName {
  HIT_ENEMIES = 'hitFromEnemiesOverlapHandler',
  HIT_ULTRON_REPULSOR = 'hitFromUltronRepulsorOverlapHandler',
  ATTACK = 'attackOverlapHandler',
  ULTRON1 = 'ultron1OverlapHandler',
}

export enum TimerName {
  REPULSOR = 'repulsorModeTimerEvent',
  HIT = 'hitModeTimerEvent',
  GATHER = 'gatherModeTimerEvent',
  BEAM = 'beamModeTimerEvent',
  HIT_SETUP = 'hitSetupTimerEvent',
  ULTRON_1_MODE = 'ultron1ModeTimerEvent',
  ULTROM_REPULSOR_FIRE = 'ultronRepulsorFireTimerEvent',
}

export enum DurationName {
  REPULSOR = 'repulsorModeDuration',
  HIT = 'hitModeDuration',
  GATHER = 'gatherModeDuration',
  BEAM = 'beamModeDuration',
  HIT_SETUP = 'hitSetupDuration',
  ULTRON_1_MODE = 'ultron1ModeDuration',
  ULTROM_REPULSOR_FIRE = 'ultronRepulsorFireDuration',
}

export enum StateName {
  IS_BEAM_MODE_ACTIVE = 'isBeamModeActive',
  IS_INVINCIBLE = 'isInvincible',
  CURRENT_GAUGE_COUNT = 'currentGaugeCount',
}

export enum GroupType {
  ENEMIES = 'enemies',
  REPULSORS = 'repulsors',
  ULTORON_REPULSORS = 'ultronRepulsors',
  WEAPONS = 'weapons',
}
