import { Injectable, TemplateRef } from '@angular/core';
import { BonusCard } from 'src/app/model/bonus-card';
import { ExtraFinalScoringTile } from 'src/app/model/extra-final-scoring-tile';
import { Faction } from 'src/app/model/faction';
import { GameBoard } from 'src/app/model/game-board';
import { BASIC_PROFILE, Profile, ProfileDetails } from 'src/app/model/profile';
import { ScoringTile } from 'src/app/model/scoring-tile';
import { SelectableItemTemplateContext } from 'src/app/shared/pages/grid-selection/grid-selection.page';

@Injectable({
  providedIn: 'root'
})
export class GameSetupService implements ProfileDetails {
  // Selected profile
  baseProfile: Profile = BASIC_PROFILE;

  // Game settings (extracted from the base profile)
  factions: Faction[];
  bonusCards: BonusCard[];
  scoringTiles: ScoringTile[];
  extraFinalScoringTiles: ExtraFinalScoringTile[];
  gameBoards: GameBoard[];
  numPlayers: number;
  numFactions: number;
  allowCityScoring1stRound: boolean;

  // Data shared between routes
  scoringTileTemplate: TemplateRef<SelectableItemTemplateContext<ScoringTile>>;
}
