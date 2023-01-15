import { Injectable, TemplateRef } from '@angular/core';
import { BonusCard } from 'src/app/model/bonus-card';
import { ExtraFinalScoringTile } from 'src/app/model/extra-final-scoring-tile';
import { Faction } from 'src/app/model/faction';
import { GameBoard } from 'src/app/model/game-board';
import { ArtifactPickMode, FactionPickMode, GameSetupOptions } from 'src/app/model/game-setup-options';
import { ScoringTile } from 'src/app/model/scoring-tile';
import { SelectableItemTemplateContext } from 'src/app/shared/pages/grid-selection/grid-selection.page';

@Injectable()
export class GameSetupService implements GameSetupOptions {
  // Game settings (extracted from the base profile)
  factions: Faction[] = [];
  bonusCards: BonusCard[] = [];
  scoringTiles: ScoringTile[] = [];
  extraFinalScoringTiles: ExtraFinalScoringTile[] = [];
  gameBoards: GameBoard[] = [];
  numPlayers: number = 0;
  factionPickMode: FactionPickMode = FactionPickMode.bid;
  preventTownScoring1stRound: boolean = false;
  preventTripleActionPhaseScoring: boolean = false;
  playerNames: string[] = [];
  artifacts: ArtifactPickMode = ArtifactPickMode.none;

  // Data shared between routes
  scoringTileTemplate: TemplateRef<SelectableItemTemplateContext<ScoringTile>> | null = null;
}
