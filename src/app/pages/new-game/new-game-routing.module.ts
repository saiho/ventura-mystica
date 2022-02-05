import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BonusCard, BONUS_CARDS_ALL } from 'src/app/model/bonus-card';
import { ExtraFinalScoringTile, EXTRA_FINAL_SCORING_TILES_ALL } from 'src/app/model/extra-final-scoring-tile';
import { Faction, FACTIONS_ALL } from 'src/app/model/faction';
import { GameBoard, GAME_BOARDS_ALL } from 'src/app/model/game-board';
import { ScoringTile, SCORING_TILES_ALL } from 'src/app/model/scoring-tile';
import { GridSelectionGuard } from 'src/app/shared/pages/grid-selection/grid-selection.guard';
import { GridSelectionData, GridSelectionPage } from 'src/app/shared/pages/grid-selection/grid-selection.page';
import { GameSetupService } from './game-setup.service';
import { NewGamePage } from './new-game.page';


const routes: Routes = [
  {
    path: '',
    component: NewGamePage,
  },
  {
    path: 'factions',
    component: GridSelectionPage,
    canActivate: [GridSelectionGuard],
    data: {
      title: 'factions',
      bindComponentType: GameSetupService,
      bindPropertyItems: 'factions',
      allItems: FACTIONS_ALL
    } as GridSelectionData<GameSetupService, Faction>
  },
  {
    path: 'bonus-cards',
    component: GridSelectionPage,
    canActivate: [GridSelectionGuard],
    data: {
      title: 'bonus-cards',
      bindComponentType: GameSetupService,
      bindPropertyItems: 'bonusCards',
      allItems: BONUS_CARDS_ALL
    } as GridSelectionData<GameSetupService, BonusCard>
  },
  {
    path: 'scoring-tiles',
    component: GridSelectionPage,
    canActivate: [GridSelectionGuard],
    data: {
      title: 'scoring-tiles',
      bindComponentType: GameSetupService,
      bindPropertyItems: 'scoringTiles',
      bindPropertyTemplate: 'scoringTileTemplate',
      allItems: SCORING_TILES_ALL
    } as GridSelectionData<GameSetupService, ScoringTile>
  },
  {
    path: 'extra-final-scoring-tiles',
    component: GridSelectionPage,
    canActivate: [GridSelectionGuard],
    data: {
      title: 'extra-final-scoring-tiles',
      bindComponentType: GameSetupService,
      bindPropertyItems: 'extraFinalScoringTiles',
      allItems: EXTRA_FINAL_SCORING_TILES_ALL
    } as GridSelectionData<GameSetupService, ExtraFinalScoringTile>
  },
  {
    path: 'game-boards',
    component: GridSelectionPage,
    canActivate: [GridSelectionGuard],
    data: {
      title: 'game-boards',
      bindComponentType: GameSetupService,
      bindPropertyItems: 'gameBoards',
      allItems: GAME_BOARDS_ALL
    } as GridSelectionData<GameSetupService, GameBoard>
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewGamePageRoutingModule { }
