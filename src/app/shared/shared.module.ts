import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { InputFactionsValidatorDirective } from './input-factions-validator.directive';

@NgModule({
  declarations: [
    InputFactionsValidatorDirective
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
    InputFactionsValidatorDirective
  ]
})
export class SharedModule { }
