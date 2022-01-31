import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoringTile, SCORING_TILES_ALL } from 'src/app/model/scoring-tile';
import { GridSelectionGuard } from 'src/app/shared/pages/grid-selection/grid-selection.guard';
import { GridSelectionData, GridSelectionPage } from 'src/app/shared/pages/grid-selection/grid-selection.page';
import { GameSetupPage } from './game-setup/game-setup.page';
import { GameSetupService } from './game-setup/game-setup.service';
import { NewGamePage } from './new-game.page';


const routes: Routes = [
  {
    path: '',
    component: NewGamePage,
    children: [
      {
        path: '',
        component: GameSetupPage
      },
      {
        path: 'scoring-tiles',
        component: GridSelectionPage,
        canActivate: [GridSelectionGuard],
        data: {
          bindComponentType: GameSetupService,
          allItems: SCORING_TILES_ALL,
          getSelectedItems: (component: GameSetupService) => component.scoringTiles,
          setSelectedItems: (component: GameSetupService, items: ScoringTile[]) => { component.scoringTiles = items; },
          getCustomTemplate: (component: GameSetupService) => component.scoringTileTemplate
        } as GridSelectionData<GameSetupService, ScoringTile>
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewGamePageRoutingModule { }
