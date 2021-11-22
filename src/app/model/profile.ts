import {
  Factions,
  FACTIONS_BASIC,
  FACTIONS_FIRE_ICE,
  FACTIONS_POWER_COMING,
  FACTIONS_POWER_COMING_FIRE_ICE
} from './faction';

export class Profile {
  public constructor(
    public name: string,
    public factions: Factions[],
    public exraFinalScoringTile: boolean,
    public predefined: boolean = false,
    public numPlayers: number = 2,
    public numFactions: number = numPlayers
  ) {
  }

  public clone(): Profile {
    return { ...this };
  }
}

export const BASIC_PROFILE = new Profile(
  'basic',
  FACTIONS_BASIC,
  false,
  true);

export const PREDEFINED_PROFILES = [
  BASIC_PROFILE,
  new Profile(
    'fire-ice',
    FACTIONS_FIRE_ICE,
    true,
    true),
  new Profile(
    'power-coming',
    FACTIONS_POWER_COMING,
    false,
    true),
  new Profile(
    'power-coming-and-fire-ice',
    FACTIONS_POWER_COMING_FIRE_ICE,
    true,
    true)];
