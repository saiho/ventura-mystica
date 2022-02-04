import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
