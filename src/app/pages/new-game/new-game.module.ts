import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NewGamePageRoutingModule } from './new-game-routing.module';
import { NewGamePage } from './new-game.page';

@NgModule({
  imports: [
    SharedModule,
    NewGamePageRoutingModule
  ],
  declarations: [NewGamePage]
})
export class NewGamePageModule { }
