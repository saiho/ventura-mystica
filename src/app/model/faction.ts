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

const FACTIONS = {
  // Basic
  alchemists: new Faction('faction.alchemists', Terrain.swamp),
  auren: new Faction('faction.auren', Terrain.forest),
  chaosMagicians: new Faction('faction.chaosmagicians', Terrain.wasteland),
  cultists: new Faction('faction.cultists', Terrain.plains),
  darklings: new Faction('faction.darklings', Terrain.swamp),
  dwarves: new Faction('faction.dwarves', Terrain.mountains),
  engineers: new Faction('faction.engineers', Terrain.mountains),
  fakirs: new Faction('faction.fakirs', Terrain.desert),
  giants: new Faction('faction.giants', Terrain.wasteland),
  halflings: new Faction('faction.halflings', Terrain.plains),
  mermaids: new Faction('faction.mermaids', Terrain.lakes),
  nomads: new Faction('faction.nomads', Terrain.desert),
  swarmlings: new Faction('faction.swarmlings', Terrain.lakes),
  witches: new Faction('faction.witches', Terrain.forest),
  // Fire & Ice
  acolytes: new Faction('faction.acolytes', Terrain.volcano),
  dragonlords: new Faction('faction.dragonlords', Terrain.volcano),
  iceMaidens: new Faction('faction.icemaidens', Terrain.ice),
  riverwalkers: new Faction('faction.riverwalkers', Terrain.multiple),
  shapeshifters: new Faction('faction.shapeshifters', Terrain.multiple),
  yetis: new Faction('faction.yetis', Terrain.ice),
  // Power is coming
  dryads: new Faction('faction.dryads', Terrain.forest),
  illusionists: new Faction('faction.illusionists', Terrain.swamp),
  middleMen: new Faction('faction.middlemen', Terrain.mountains),
  seafarers: new Faction('faction.seafarers', Terrain.lakes),
  shamans: new Faction('faction.shamans', Terrain.plains),
  shaolins: new Faction('faction.shaolins', Terrain.wasteland),
  vizirs: new Faction('faction.vizirs', Terrain.desert),
  // Power is coming + Fire & Ice
  efreets: new Faction('faction.efreets', Terrain.volcano),
  inuits: new Faction('faction.inuits', Terrain.ice),
  mutants: new Faction('faction.mutants', Terrain.multiple)
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
  FACTIONS.acolytes,
  FACTIONS.dragonlords,
  FACTIONS.iceMaidens,
  FACTIONS.riverwalkers,
  FACTIONS.shapeshifters,
  FACTIONS.yetis
];

export const FACTIONS_POWER_COMING_BASIC = [
  FACTIONS.dryads,
  FACTIONS.illusionists,
  FACTIONS.middleMen,
  FACTIONS.seafarers,
  FACTIONS.shamans,
  FACTIONS.shaolins,
  FACTIONS.vizirs
];

export const FACTIONS_POWER_COMING_FIRE_ICE = [
  FACTIONS.efreets,
  FACTIONS.inuits,
  FACTIONS.mutants
];
