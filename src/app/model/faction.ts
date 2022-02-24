import { SelectableItem } from '../shared/pages/grid-selection/grid-selection.page';
import { Expansion } from './expansion';
import { Terrain } from './terrain';

export class Faction implements SelectableItem {
  public constructor(
    public readonly name: string,
    public readonly terrain: Terrain,
    public readonly expansion: Expansion
  ) {
  }

  getName(): string {
    return this.name;
  }
}

// Basic
export const FACTIONS_BASIC = [
  new Faction('faction.alchemists', Terrain.swamp, Expansion.basic),
  new Faction('faction.auren', Terrain.forest, Expansion.basic),
  new Faction('faction.chaosmagicians', Terrain.wasteland, Expansion.basic),
  new Faction('faction.cultists', Terrain.plains, Expansion.basic),
  new Faction('faction.darklings', Terrain.swamp, Expansion.basic),
  new Faction('faction.dwarves', Terrain.mountains, Expansion.basic),
  new Faction('faction.engineers', Terrain.mountains, Expansion.basic),
  new Faction('faction.fakirs', Terrain.desert, Expansion.basic),
  new Faction('faction.giants', Terrain.wasteland, Expansion.basic),
  new Faction('faction.halflings', Terrain.plains, Expansion.basic),
  new Faction('faction.mermaids', Terrain.lakes, Expansion.basic),
  new Faction('faction.nomads', Terrain.desert, Expansion.basic),
  new Faction('faction.swarmlings', Terrain.lakes, Expansion.basic),
  new Faction('faction.witches', Terrain.forest, Expansion.basic),
];

// Fire & Ice
export const FACTIONS_FIRE_ICE = [
  new Faction('faction.acolytes', Terrain.volcano, Expansion.fireIce),
  new Faction('faction.dragonlords', Terrain.volcano, Expansion.fireIce),
  new Faction('faction.icemaidens', Terrain.ice, Expansion.fireIce),
  new Faction('faction.riverwalkers', Terrain.multiple, Expansion.fireIce),
  new Faction('faction.shapeshifters', Terrain.multiple, Expansion.fireIce),
  new Faction('faction.yetis', Terrain.ice, Expansion.fireIce),
];

// Power is coming
export const FACTIONS_POWER_COMING_BASIC = [
  new Faction('faction.dryads', Terrain.forest, Expansion.powerIsComing),
  new Faction('faction.illusionists', Terrain.swamp, Expansion.powerIsComing),
  new Faction('faction.middlemen', Terrain.mountains, Expansion.powerIsComing),
  new Faction('faction.seafarers', Terrain.lakes, Expansion.powerIsComing),
  new Faction('faction.shamans', Terrain.plains, Expansion.powerIsComing),
  new Faction('faction.shaolins', Terrain.wasteland, Expansion.powerIsComing),
  new Faction('faction.vizirs', Terrain.desert, Expansion.powerIsComing),
];

// Power is coming with Fire & Ice
export const FACTIONS_POWER_COMING_FIRE_ICE = [
  new Faction('faction.efreets', Terrain.volcano, Expansion.powerIsComing),
  new Faction('faction.inuits', Terrain.ice, Expansion.powerIsComing),
  new Faction('faction.mutants', Terrain.multiple, Expansion.powerIsComing)
];

export const FACTIONS_ALL = [
  ...FACTIONS_BASIC,
  ...FACTIONS_FIRE_ICE,
  ...FACTIONS_POWER_COMING_BASIC,
  ...FACTIONS_POWER_COMING_FIRE_ICE
];
