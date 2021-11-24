import { Terrain } from './terrain';

export class Faction {
  constructor(
    public readonly name: string,
    public readonly terrain: Terrain
  ) {
  }

  public toString(): string {
    return this.name;
  };
}

export const FACTIONS = {
  // Basic
  alchemists: new Faction('alchemists', Terrain.swamp),
  auren: new Faction('auren', Terrain.forest),
  chaosMagicians: new Faction('chaosmagicians', Terrain.wasteland),
  cultists: new Faction('cultists', Terrain.plains),
  darklings: new Faction('darklings', Terrain.swamp),
  dwarves: new Faction('dwarves', Terrain.mountains),
  engineers: new Faction('engineers', Terrain.mountains),
  fakirs: new Faction('fakirs', Terrain.desert),
  giants: new Faction('giants', Terrain.wasteland),
  halflings: new Faction('halflings', Terrain.plains),
  mermaids: new Faction('mermaids', Terrain.lakes),
  nomads: new Faction('nomads', Terrain.desert),
  swarmlings: new Faction('swarmlings', Terrain.lakes),
  witches: new Faction('witches', Terrain.forest),
  // Fire & Ice
  acolytes: new Faction('acolytes', Terrain.volcano),
  dragonlords: new Faction('dragonlords', Terrain.volcano),
  iceMaidens: new Faction('icemaidens', Terrain.ice),
  riverwalkers: new Faction('riverwalkers', Terrain.multiple),
  shapeshifters: new Faction('shapeshifters', Terrain.multiple),
  yetis: new Faction('yetis', Terrain.ice),
  // Power is coming
  dryads: new Faction('dryads', Terrain.forest),
  illusionists: new Faction('illusionists', Terrain.swamp),
  middleMen: new Faction('middlemen', Terrain.mountains),
  seafarers: new Faction('seafarers', Terrain.lakes),
  shamans: new Faction('shamans', Terrain.plains),
  shaolins: new Faction('shaolins', Terrain.wasteland),
  vizirs: new Faction('vizirs', Terrain.desert),
  // Power is coming + Fire & Ice
  efreets: new Faction('efreets', Terrain.volcano),
  inuits: new Faction('inuits', Terrain.ice),
  mutants: new Faction('mutants', Terrain.multiple)
};

export const FACTIONS_ALL = Object.values(FACTIONS);

export const FACTIONS_BASIC = [
  FACTIONS.alchemists,
  FACTIONS.auren,
  FACTIONS.chaosMagicians,
  FACTIONS.cultists,
  FACTIONS.darklings,
  FACTIONS.dwarves,
  FACTIONS.engineers,
  FACTIONS.fakirs,
  FACTIONS.giants,
  FACTIONS.halflings,
  FACTIONS.mermaids,
  FACTIONS.nomads,
  FACTIONS.swarmlings,
  FACTIONS.witches
];

export const FACTIONS_FIRE_ICE = [
  ...FACTIONS_BASIC,
  FACTIONS.acolytes,
  FACTIONS.dragonlords,
  FACTIONS.iceMaidens,
  FACTIONS.riverwalkers,
  FACTIONS.shapeshifters,
  FACTIONS.yetis
];

export const FACTIONS_POWER_COMING = [
  ...FACTIONS_BASIC,
  FACTIONS.dryads,
  FACTIONS.illusionists,
  FACTIONS.middleMen,
  FACTIONS.seafarers,
  FACTIONS.shamans,
  FACTIONS.shaolins,
  FACTIONS.vizirs
];

export const FACTIONS_POWER_COMING_FIRE_ICE = FACTIONS_ALL;
