import { BonusCard } from './bonus-card';
import { ExtraFinalScoringTile } from './extra-final-scoring-tile';
import { Faction } from './faction';
import { GameBoard } from './game-board';
import { ScoringTile } from './scoring-tile';

export enum FactionPickMode {
  bid = 'faction-pick-mode.bid',
  twoAlternativesPerPlayer = 'faction-pick-mode.two-alternatives'
}

export enum ArtifactPickMode {
  none = 'artifact-pick-mode.none',
  asNumPlayers = 'artifact-pick-mode.as-num-players',
  asNumPlayersLessOne = 'artifact-pick-mode.as-num-players-less-one',
  assignToFaction = 'artifact-pick-mode.assign-to-faction'
}

export interface GameSetupOptions {
  factions: Faction[];
  bonusCards: BonusCard[];
  scoringTiles: ScoringTile[];
  extraFinalScoringTiles: ExtraFinalScoringTile[];
  gameBoards: GameBoard[];
  numPlayers: number;
  factionPickMode: FactionPickMode;
  preventTownScoring1stRound: boolean;
  preventTripleActionPhaseScoring: boolean;
  artifacts: ArtifactPickMode;
  playerNames: string[];
}
