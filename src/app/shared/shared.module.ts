import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DateIntPipe } from '../pipes/date-int.pipe';
import { InputBonusCardsValidatorDirective } from './input-bonus-cards-validator.directive';
import { InputFactionsValidatorDirective } from './input-factions-validator.directive';
import { InputScoringTilesValidatorDirective } from './input-scoring-tiles-validator.directive';

@NgModule({
  declarations: [
    DateIntPipe,
    InputFactionsValidatorDirective,
    InputBonusCardsValidatorDirective,
    InputScoringTilesValidatorDirective
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
    InputFactionsValidatorDirective,
    InputBonusCardsValidatorDirective,
    InputScoringTilesValidatorDirective
  ]
})
export class SharedModule { }
