export enum Factions {
  // Basic
  alchemists = 'alchemists',
  auren = 'auren',
  chaosMagicians = 'chaosmagicians',
  cultists = 'cultists',
  darklings = 'darklings',
  dwarves = 'dwarves',
  engineers = 'engineers',
  fakirs = 'fakirs',
  giants = 'giants',
  halflings = 'halflings',
  mermaids = 'mermaids',
  nomads = 'nomads',
  riverwalkers = 'riverwalkers',
  shapeshifters = 'shapeshifters',
  swarmlings = 'swarmlings',
  witches = 'witches',
  // Fire & Ice
  acolytes = 'acolytes',
  dragonlords = 'dragonlords',
  iceMaidens = 'icemaidens',
  yetis = 'yetis',
  // Power is coming
  dryads = 'dryads',
  illusionists = 'illusionists',
  middleMen = 'middlemen',
  mutants = 'mutants',
  seafarers = 'seafarers',
  shamans = 'shamans',
  shaolins = 'shaolins',
  vizirs = 'vizirs',
  // Power is coming + Fire & Ice
  efreets = 'efreets',
  inuits = 'inuits'
}

export const FACTIONS_BASIC = [
  Factions.alchemists,
  Factions.auren,
  Factions.chaosMagicians,
  Factions.cultists,
  Factions.darklings,
  Factions.dwarves,
  Factions.engineers,
  Factions.fakirs,
  Factions.giants,
  Factions.halflings,
  Factions.mermaids,
  Factions.nomads,
  Factions.riverwalkers,
  Factions.shapeshifters,
  Factions.swarmlings,
  Factions.witches
];

export const FACTIONS_FIRE_ICE = [
  ...FACTIONS_BASIC,
  Factions.acolytes,
  Factions.dragonlords,
  Factions.iceMaidens,
  Factions.yetis
];

export const FACTIONS_POWER_COMING = [
  ...FACTIONS_BASIC,
  Factions.dryads,
  Factions.illusionists,
  Factions.middleMen,
  Factions.mutants,
  Factions.seafarers,
  Factions.shamans,
  Factions.shaolins,
  Factions.vizirs
];

export const FACTIONS_POWER_COMING_FIRE_ICE = [
  ...FACTIONS_FIRE_ICE,
  Factions.dryads,
  Factions.illusionists,
  Factions.middleMen,
  Factions.mutants,
  Factions.seafarers,
  Factions.shamans,
  Factions.shaolins,
  Factions.vizirs,
  Factions.efreets,
  Factions.inuits
];
