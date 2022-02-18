import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { GameSetupOptionsComponent } from './components/game-setup-options/game-setup-options.component';
import { GridSelectionPageModule } from './pages/grid-selection/grid-selection.module';
import { DateIntPipe } from './pipes/date-int.pipe';
import { GameSetupService } from './services/game-setup.service';
import { FactionsValidatorDirective } from './validators/factions-validator.directive';
import { ScoringTilesValidatorDirective } from './validators/scoring-tiles-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    IonicModule,
    GridSelectionPageModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    IonicModule,
    DateIntPipe,
    GridSelectionPageModule,
    GameSetupOptionsComponent
  ],
  declarations: [
    DateIntPipe,
    GameSetupOptionsComponent,
    FactionsValidatorDirective,
    ScoringTilesValidatorDirective
  ],
  providers: [
    GameSetupService
  ]
})
export class SharedModule { }
