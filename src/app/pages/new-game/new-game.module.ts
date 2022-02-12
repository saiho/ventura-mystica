import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GenerateSetupGuard } from './generate-setup/generate-setup.guard';
import { GenerateSetupPage } from './generate-setup/generate-setup.page';
import { NewGamePageRoutingModule } from './new-game-routing.module';
import { NewGamePage } from './new-game.page';

@NgModule({
  imports: [
    SharedModule,
    NewGamePageRoutingModule
  ],
  declarations: [
    NewGamePage,
    GenerateSetupPage
  ],
  providers: [
    GenerateSetupGuard
  ]
})
export class NewGamePageModule { }
