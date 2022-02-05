import { SelectableItem } from '../shared/pages/grid-selection/grid-selection.page';
import { Terrain } from './terrain';

export class Faction implements SelectableItem {
  public constructor(
    public readonly name: string,
    public readonly terrain: Terrain
  ) {
  }

  getName(): string {
    return this.name;
  }
}

// Basic
export const FACTIONS_BASIC = [
  new Faction('faction.alchemists', Terrain.swamp),
  new Faction('faction.auren', Terrain.forest),
  new Faction('faction.chaosmagicians', Terrain.wasteland),
  new Faction('faction.cultists', Terrain.plains),
  new Faction('faction.darklings', Terrain.swamp),
  new Faction('faction.dwarves', Terrain.mountains),
  new Faction('faction.engineers', Terrain.mountains),
  new Faction('faction.fakirs', Terrain.desert),
  new Faction('faction.giants', Terrain.wasteland),
  new Faction('faction.halflings', Terrain.plains),
  new Faction('faction.mermaids', Terrain.lakes),
  new Faction('faction.nomads', Terrain.desert),
  new Faction('faction.swarmlings', Terrain.lakes),
  new Faction('faction.witches', Terrain.forest),
];

// Fire & Ice
export const FACTIONS_FIRE_ICE = [
  new Faction('faction.acolytes', Terrain.volcano),
  new Faction('faction.dragonlords', Terrain.volcano),
  new Faction('faction.icemaidens', Terrain.ice),
  new Faction('faction.riverwalkers', Terrain.multiple),
  new Faction('faction.shapeshifters', Terrain.multiple),
  new Faction('faction.yetis', Terrain.ice),
];

// Power is coming
export const FACTIONS_POWER_COMING_BASIC = [
  new Faction('faction.dryads', Terrain.forest),
  new Faction('faction.illusionists', Terrain.swamp),
  new Faction('faction.middlemen', Terrain.mountains),
  new Faction('faction.seafarers', Terrain.lakes),
  new Faction('faction.shamans', Terrain.plains),
  new Faction('faction.shaolins', Terrain.wasteland),
  new Faction('faction.vizirs', Terrain.desert),
];

// Power is coming with Fire & Ice
export const FACTIONS_POWER_COMING_FIRE_ICE = [
  new Faction('faction.efreets', Terrain.volcano),
  new Faction('faction.inuits', Terrain.ice),
  new Faction('faction.mutants', Terrain.multiple)
];

export const FACTIONS_ALL = [
  ...FACTIONS_BASIC,
  ...FACTIONS_FIRE_ICE,
  ...FACTIONS_POWER_COMING_BASIC,
  ...FACTIONS_POWER_COMING_FIRE_ICE
];
