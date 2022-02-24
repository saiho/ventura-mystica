import { BonusCard } from './bonus-card';
import { ExtraFinalScoringTile } from './extra-final-scoring-tile';
import { Faction } from './faction';
import { GameBoard } from './game-board';
import { ScoringTile } from './scoring-tile';

export enum FactionPickMode {
  bid = 'faction-pick-mode.bid',
  twoAlternativesPerPlayer = 'faction-pick-mode.two-alternatives'
}

export interface GameSetupOptions {
  factions: Faction[];
  bonusCards: BonusCard[];
  scoringTiles: ScoringTile[];
  extraFinalScoringTiles: ExtraFinalScoringTile[];
  gameBoards: GameBoard[];
  numPlayers: number;
  factionPickMode: FactionPickMode;
  allowTownScoring1stRound: boolean;
  playerNames: string[];
}
