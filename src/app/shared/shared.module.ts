import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { InputBonusCardsValidatorDirective } from './input-bonus-cards-validator.directive';
import { InputFactionsValidatorDirective } from './input-factions-validator.directive';

@NgModule({
  declarations: [
    InputFactionsValidatorDirective,
    InputBonusCardsValidatorDirective
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
    InputFactionsValidatorDirective,
    InputBonusCardsValidatorDirective
  ]
})
export class SharedModule { }
