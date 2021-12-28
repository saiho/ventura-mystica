import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSetupPage } from './game-setup/game-setup.page';
import { NewGamePage } from './new-game.page';
import { ScoringTilesGuard } from './scoring-tiles/scoring-tiles.guard';
import { ScoringTilesPage } from './scoring-tiles/scoring-tiles.page';


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
        component: ScoringTilesPage,
        canActivate: [ScoringTilesGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewGamePageRoutingModule { }
