import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DateIntPipe } from '../pipes/date-int.pipe';
import { GridSelectionPageModule } from './pages/grid-selection/grid-selection.module';
import { GameSetupService } from './services/game-setup.service';
import { FactionsValidatorDirective } from './validations/factions-validator.directive';
import { ScoringTilesValidatorDirective } from './validations/scoring-tiles-validator.directive';
import { SelectedMinimumDirective } from './validations/selected-minimum-validator.directive';

@NgModule({
  declarations: [
    DateIntPipe,
    SelectedMinimumDirective,
    FactionsValidatorDirective,
    ScoringTilesValidatorDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    GridSelectionPageModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    GridSelectionPageModule,
    DateIntPipe,
    SelectedMinimumDirective,
    FactionsValidatorDirective,
    ScoringTilesValidatorDirective
  ],
  providers: [
    GameSetupService
  ]
})
export class SharedModule { }
