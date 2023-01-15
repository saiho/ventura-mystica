import { Location } from '@angular/common';
import { Component, Injector, TemplateRef, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { KeysOfType } from '../../utils';

@Component({
  selector: 'app-grid-selection',
  templateUrl: './grid-selection.page.html',
  styleUrls: ['./grid-selection.page.scss'],
})
export class GridSelectionPage {

  title: string = '';
  allItems: SelectableItem[] = [];
  listSelected: boolean[] = [];
  itemTemplate: TemplateRef<SelectableItemTemplateContext<SelectableItem>> | null = null;

  private bindComponent: any;
  private bindPropertyItems: KeysOfType<any, SelectableItem[]> = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private injector: Injector
  ) {

    (this.route.data as Observable<GridSelectionData<any, SelectableItem>>).subscribe(data => {
      this.title = data.title;
      this.bindComponent = this.injector.get(data.bindComponentType);
      this.bindPropertyItems = data.bindPropertyItems;
      this.allItems = data.allItems;
      const selectedItems = this.bindComponent[this.bindPropertyItems];
      this.listSelected = this.allItems.map(item => _.find(selectedItems, item) != null);
      this.itemTemplate = data.bindPropertyTemplate ? this.bindComponent[data.bindPropertyTemplate] : null;
    });
  }

  onClickOk() {
    const newItems: any[] = [];
    this.listSelected.forEach((selected, i) => {
      if (selected) {
        newItems.push(this.allItems[i]);
      }
    });
    this.bindComponent[this.bindPropertyItems] = newItems;
    this.onClickCancel(); // Go back
  }

  onClickCancel() {
    this.router.navigate(['..'], // Go to parent route
      {
        relativeTo: this.route,
        replaceUrl: true // Prevent going forward in history after clicking ok/cancel by replacing the last history state
      });
    this.location.back(); // This does nothing, because it goes also to the parent route, but avoids accumulating history changes
  }

}

export interface SelectableItem {
  getName(): string | null;
  getImage?(): string;
}

export interface SelectableItemTemplateContext<T> {
  readonly item: T;
}

export interface GridSelectionData<T, U extends SelectableItem> {
  readonly title: string;
  readonly bindComponentType: Type<T>;
  readonly bindPropertyItems: KeysOfType<T, U[]>;
  readonly bindPropertyTemplate: KeysOfType<T, TemplateRef<SelectableItemTemplateContext<U>>>;
  readonly allItems: U[];
}
