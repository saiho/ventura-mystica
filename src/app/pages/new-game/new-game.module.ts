import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameSetupPage } from './game-setup/game-setup.page';
import { NewGamePageRoutingModule } from './new-game-routing.module';
import { NewGamePage } from './new-game.page';

@NgModule({
  imports: [
    SharedModule,
    NewGamePageRoutingModule
  ],
  declarations: [
    NewGamePage,
    GameSetupPage
  ]
})
export class NewGamePageModule { }
