import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
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
    IonicModule
  ]
})
export class SharedModule { }
