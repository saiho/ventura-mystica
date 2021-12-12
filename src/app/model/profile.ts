import * as _ from 'lodash';
import {
  BonusCard,
  BONUS_CARDS_ALL,
  BONUS_CARDS_BASIC,
  BONUS_CARDS_MERCHANTS,
  BONUS_CARDS_MINI_EXPANSION
} from './bonus-card';
import {
  ExtraFinalScoringTile,
  EXTRA_FINAL_SCORING_TILES_ALL,
  EXTRA_FINAL_SCORING_TILES_FIRE_ICE,
  EXTRA_FINAL_SCORING_TILES_MERCHANTS
} from './extra-final-scoring-tile';
import {
  Faction,
  FACTIONS_ALL,
  FACTIONS_BASIC,
  FACTIONS_FIRE_ICE,
  FACTIONS_POWER_COMING_BASIC,
  FACTIONS_POWER_COMING_FIRE_ICE
} from './faction';
import {
  ScoringTile,
  SCORING_TILES_ALL,
  SCORING_TILES_BASIC,
  SCORING_TILES_MERCHANTS,
  SCORING_TILES_MINI_EXPANSION
} from './scoring-tile';

export interface ProfileDetails {
  factions: Faction[];
  bonusCards: BonusCard[];
  scoringTiles: ScoringTile[];
  extraFinalScoringTiles: ExtraFinalScoringTile[];
  numPlayers: number;
  numFactions: number;
}

export class Profile implements ProfileDetails {
  public constructor(
    public readonly predefined: boolean,
    public name: string,
    public factions: Faction[],
    public bonusCards: BonusCard[],
    public scoringTiles: ScoringTile[],
    public extraFinalScoringTiles: ExtraFinalScoringTile[],
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

  public copyDeatilsTo(profileDetails: ProfileDetails) {
    profileDetails.factions = this.factions;
    profileDetails.bonusCards = this.bonusCards;
    profileDetails.scoringTiles = this.scoringTiles;
    profileDetails.extraFinalScoringTiles = this.extraFinalScoringTiles;
    profileDetails.numPlayers = this.numPlayers;
    profileDetails.numFactions = this.numFactions;
  }
}

export const BASIC_PROFILE = new Profile(
  true,
  'predefined-profile.basic',
  FACTIONS_BASIC,
  BONUS_CARDS_BASIC,
  SCORING_TILES_BASIC,
  []);

export const PREDEFINED_PROFILES = [
  BASIC_PROFILE,
  new Profile(
    true,
    'predefined-profile.fire-ice',
    [...FACTIONS_BASIC, ...FACTIONS_FIRE_ICE],
    BONUS_CARDS_BASIC,
    SCORING_TILES_BASIC,
    EXTRA_FINAL_SCORING_TILES_FIRE_ICE),
  new Profile(
    true,
    'predefined-profile.fire-ice-and-mini-expansion',
    [...FACTIONS_BASIC, ...FACTIONS_FIRE_ICE],
    [...BONUS_CARDS_BASIC, ...BONUS_CARDS_MINI_EXPANSION],
    [...SCORING_TILES_BASIC, ...SCORING_TILES_MINI_EXPANSION],
    EXTRA_FINAL_SCORING_TILES_FIRE_ICE),
  new Profile(
    true,
    'predefined-profile.power-coming',
    [...FACTIONS_BASIC, ...FACTIONS_POWER_COMING_BASIC],
    BONUS_CARDS_BASIC,
    SCORING_TILES_BASIC,
    []),
  new Profile(
    true,
    'predefined-profile.fire-ice-and-mini-expansion-and-power-coming',
    [...FACTIONS_BASIC, ...FACTIONS_FIRE_ICE, ...FACTIONS_POWER_COMING_BASIC, ...FACTIONS_POWER_COMING_FIRE_ICE],
    [...BONUS_CARDS_BASIC, ...BONUS_CARDS_MINI_EXPANSION],
    [...SCORING_TILES_BASIC, ...SCORING_TILES_MINI_EXPANSION],
    EXTRA_FINAL_SCORING_TILES_FIRE_ICE),
  new Profile(
    true,
    'predefined-profile.all-official',
    FACTIONS_FIRE_ICE,
    [...BONUS_CARDS_BASIC, ...BONUS_CARDS_MINI_EXPANSION, ...BONUS_CARDS_MERCHANTS],
    [...SCORING_TILES_MINI_EXPANSION, ...SCORING_TILES_MERCHANTS],
    [...EXTRA_FINAL_SCORING_TILES_FIRE_ICE, ...EXTRA_FINAL_SCORING_TILES_MERCHANTS]),
  new Profile(
    true,
    'predefined-profile.all-official-and-unofficial',
    FACTIONS_ALL,
    BONUS_CARDS_ALL,
    SCORING_TILES_ALL,
    EXTRA_FINAL_SCORING_TILES_ALL)
];
