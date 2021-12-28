import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameSetupPage } from './game-setup/game-setup.page';
import { NewGamePageRoutingModule } from './new-game-routing.module';
import { NewGamePage } from './new-game.page';
import { ScoringTilesGuard } from './scoring-tiles/scoring-tiles.guard';
import { ScoringTilesPage } from './scoring-tiles/scoring-tiles.page';

@NgModule({
  imports: [
    SharedModule,
    NewGamePageRoutingModule
  ],
  declarations: [
    NewGamePage,
    GameSetupPage,
    ScoringTilesPage
  ],
  providers: [
    ScoringTilesGuard
  ]
})
export class NewGamePageModule { }
