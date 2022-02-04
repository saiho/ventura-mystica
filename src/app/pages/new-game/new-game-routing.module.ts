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
      allItems: SCORING_TILES_ALL,
      getSelectedItems: (component: GameSetupService) => component.scoringTiles,
      setSelectedItems: (component: GameSetupService, items: ScoringTile[]) => { component.scoringTiles = items; },
      getCustomTemplate: (component: GameSetupService) => component.scoringTileTemplate
    } as GridSelectionData<GameSetupService, ScoringTile>
  },
  {
    path: 'game-boards',
    component: GridSelectionPage,
    canActivate: [GridSelectionGuard],
    data: {
      title: 'game-boards',
      bindComponentType: GameSetupService,
      allItems: GAME_BOARDS_ALL,
      getSelectedItems: (component: GameSetupService) => component.gameBoards,
      setSelectedItems: (component: GameSetupService, items: GameBoard[]) => { component.gameBoards = items; }
    } as GridSelectionData<GameSetupService, GameBoard>
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewGamePageRoutingModule { }
