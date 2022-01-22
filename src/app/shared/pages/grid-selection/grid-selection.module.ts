import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { GridSelectionGuard } from './grid-selection.guard';
import { GridSelectionPage } from './grid-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule
  ],
  declarations: [
    GridSelectionPage
  ],
  providers: [
    GridSelectionGuard
  ]
})
export class GridSelectionPageModule { }
