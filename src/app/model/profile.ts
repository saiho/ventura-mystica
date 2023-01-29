import { clone } from 'lodash-es';
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
  GameBoard,
  GAME_BOARDS_ALL,
  GAME_BOARDS_BASIC,
  GAME_BOARDS_FIRE_ICE,
  GAME_BOARDS_MERCHANTS
} from './game-board';
import { ArtifactPickMode, FactionPickMode, GameSetupOptions } from './game-setup-options';
import {
  ScoringTile,
  SCORING_TILES_ALL,
  SCORING_TILES_BASIC,
  SCORING_TILES_MERCHANTS,
  SCORING_TILES_MINI_EXPANSION
} from './scoring-tile';

export class Profile implements GameSetupOptions {
  public constructor(
    public readonly predefined: boolean,
    public name: string,
    public factions: Faction[],
    public bonusCards: BonusCard[],
    public scoringTiles: ScoringTile[],
    public extraFinalScoringTiles: ExtraFinalScoringTile[],
    public gameBoards: GameBoard[],
    public artifacts: ArtifactPickMode,
    public numPlayers = 2,
    public factionPickMode = FactionPickMode.bid,
    public preventTownScoring1stRound = true,
    public preventTripleActionPhaseScoring = true,
    public playerNames: string[] = [
      'default-player-name.1',
      'default-player-name.2',
      'default-player-name.3',
      'default-player-name.4',
      'default-player-name.5'
    ]
  ) {
  }

  public clone(): Profile {
    return clone(this);
  }

  public toString(): string {
    return this.name;
  };

  public copyOptionsTo(setupOptions: GameSetupOptions, preservePlayerNames: boolean) {
    setupOptions.factions = this.factions;
    setupOptions.bonusCards = this.bonusCards;
    setupOptions.scoringTiles = this.scoringTiles;
    setupOptions.extraFinalScoringTiles = this.extraFinalScoringTiles;
    setupOptions.gameBoards = this.gameBoards;
    setupOptions.numPlayers = this.numPlayers;
    setupOptions.factionPickMode = this.factionPickMode;
    setupOptions.preventTownScoring1stRound = this.preventTownScoring1stRound;
    setupOptions.preventTripleActionPhaseScoring = this.preventTripleActionPhaseScoring;
    setupOptions.artifacts = this.artifacts;
    if (!preservePlayerNames) {
      setupOptions.playerNames = this.playerNames;
    }
  }
}

export const BASIC_PROFILE = new Profile(
  true,
  'predefined-profile.basic',
  FACTIONS_BASIC,
  BONUS_CARDS_BASIC,
  SCORING_TILES_BASIC,
  [],
  GAME_BOARDS_BASIC,
  ArtifactPickMode.none);

export const PREDEFINED_PROFILES = [
  BASIC_PROFILE,
  new Profile(
    true,
    'predefined-profile.fire-ice',
    [...FACTIONS_BASIC, ...FACTIONS_FIRE_ICE],
    BONUS_CARDS_BASIC,
    SCORING_TILES_BASIC,
    EXTRA_FINAL_SCORING_TILES_FIRE_ICE,
    [...GAME_BOARDS_BASIC, ...GAME_BOARDS_FIRE_ICE],
    ArtifactPickMode.none),
  new Profile(
    true,
    'predefined-profile.fire-ice-and-mini-expansion',
    [...FACTIONS_BASIC, ...FACTIONS_FIRE_ICE],
    [...BONUS_CARDS_BASIC, ...BONUS_CARDS_MINI_EXPANSION],
    [...SCORING_TILES_BASIC, ...SCORING_TILES_MINI_EXPANSION],
    EXTRA_FINAL_SCORING_TILES_FIRE_ICE,
    [...GAME_BOARDS_BASIC, ...GAME_BOARDS_FIRE_ICE],
    ArtifactPickMode.none),
  new Profile(
    true,
    'predefined-profile.power-coming',
    [...FACTIONS_BASIC, ...FACTIONS_POWER_COMING_BASIC],
    BONUS_CARDS_BASIC,
    SCORING_TILES_BASIC,
    [],
    GAME_BOARDS_BASIC,
    ArtifactPickMode.none),
  new Profile(
    true,
    'predefined-profile.fire-ice-and-mini-expansion-and-power-coming',
    [...FACTIONS_BASIC, ...FACTIONS_FIRE_ICE, ...FACTIONS_POWER_COMING_BASIC, ...FACTIONS_POWER_COMING_FIRE_ICE],
    [...BONUS_CARDS_BASIC, ...BONUS_CARDS_MINI_EXPANSION],
    [...SCORING_TILES_BASIC, ...SCORING_TILES_MINI_EXPANSION],
    EXTRA_FINAL_SCORING_TILES_FIRE_ICE,
    [...GAME_BOARDS_BASIC, ...GAME_BOARDS_FIRE_ICE],
    ArtifactPickMode.none),
  new Profile(
    true,
    'predefined-profile.all-official',
    FACTIONS_FIRE_ICE,
    [...BONUS_CARDS_BASIC, ...BONUS_CARDS_MINI_EXPANSION, ...BONUS_CARDS_MERCHANTS],
    [...SCORING_TILES_MINI_EXPANSION, ...SCORING_TILES_MERCHANTS],
    [...EXTRA_FINAL_SCORING_TILES_FIRE_ICE, ...EXTRA_FINAL_SCORING_TILES_MERCHANTS],
    [...GAME_BOARDS_BASIC, ...GAME_BOARDS_FIRE_ICE, ...GAME_BOARDS_MERCHANTS],
    ArtifactPickMode.none),
  new Profile(
    true,
    'predefined-profile.all-official-and-unofficial',
    FACTIONS_ALL,
    BONUS_CARDS_ALL,
    SCORING_TILES_ALL,
    EXTRA_FINAL_SCORING_TILES_ALL,
    GAME_BOARDS_ALL,
    ArtifactPickMode.assignToFaction)
];
