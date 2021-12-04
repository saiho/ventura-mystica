import * as _ from 'lodash';
import {
  BonusCard,
  BONUS_CARDS_ALL,
  BONUS_CARDS_BASIC,
  BONUS_CARDS_MERCHANTS,
  BONUS_CARDS_MINI_EXPANSION
} from './bonus-card';
import {
  Faction,
  FACTIONS_ALL,
  FACTIONS_BASIC,
  FACTIONS_FIRE_ICE,
  FACTIONS_POWER_COMING_BASIC,
  FACTIONS_POWER_COMING_FIRE_ICE
} from './faction';

export class Profile {
  public constructor(
    public name: string,
    public factions: Faction[],
    public bonusCards: BonusCard[],
    public extraFinalScoringTile: boolean,
    public readonly predefined: boolean = false,
    public numPlayers: number = 2,
    public numFactions: number = numPlayers
  ) {
  }

  public clone(): Profile {
    return _.clone(this);
  }

  public toString(): string {
    return this.name;
  };
}

export const BASIC_PROFILE = new Profile(
  'predefined-profile.basic',
  FACTIONS_BASIC,
  BONUS_CARDS_BASIC,
  false,
  true);

export const PREDEFINED_PROFILES = [
  BASIC_PROFILE,
  new Profile(
    'predefined-profile.fire-ice',
    [...FACTIONS_BASIC, ...FACTIONS_FIRE_ICE],
    BONUS_CARDS_BASIC,
    true,
    true),
  new Profile(
    'predefined-profile.power-coming',
    [...FACTIONS_BASIC, ...FACTIONS_POWER_COMING_BASIC],
    BONUS_CARDS_BASIC,
    false,
    true),
  new Profile(
    'predefined-profile.fire-ice-and-power-coming',
    [...FACTIONS_BASIC, ...FACTIONS_FIRE_ICE, ...FACTIONS_POWER_COMING_BASIC, ...FACTIONS_POWER_COMING_FIRE_ICE],
    BONUS_CARDS_BASIC,
    true,
    true),
  new Profile(
    'predefined-profile.all-official',
    FACTIONS_FIRE_ICE,
    [...BONUS_CARDS_BASIC, ...BONUS_CARDS_MERCHANTS, ...BONUS_CARDS_MINI_EXPANSION],
    true,
    true),
  new Profile(
    'predefined-profile.all-official-and-unofficial',
    FACTIONS_ALL,
    BONUS_CARDS_ALL,
    true,
    true)
];
