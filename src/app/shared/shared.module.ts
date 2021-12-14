import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DateIntPipe } from '../pipes/date-int.pipe';
import { BonusCardsValidatorDirective } from './validations/input-bonus-cards-validator.directive';
import { FactionsValidatorDirective } from './validations/input-factions-validator.directive';
import { ScoringTilesValidatorDirective } from './validations/input-scoring-tiles-validator.directive';

@NgModule({
  declarations: [
    DateIntPipe,
    FactionsValidatorDirective,
    BonusCardsValidatorDirective,
    ScoringTilesValidatorDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    DateIntPipe,
    FactionsValidatorDirective,
    BonusCardsValidatorDirective,
    ScoringTilesValidatorDirective
  ]
})
export class SharedModule { }
