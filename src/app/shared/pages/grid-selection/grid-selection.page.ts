import { Location } from '@angular/common';
import { Component, Injector, OnInit, TemplateRef, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-grid-selection',
  templateUrl: './grid-selection.page.html',
  styleUrls: ['./grid-selection.page.scss'],
})
export class GridSelectionPage implements OnInit {

  title: string;
  allItems: SelectableItem[];
  listSelected: boolean[];
  itemTemplate: TemplateRef<SelectableItemTemplateContext<SelectableItem>>;

  private bindComponent: any;
  private setSelectedItemsCallback: (component: any, items: SelectableItem[]) => void;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private injector: Injector
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: GridSelectionData<any, SelectableItem>) => {
      this.title = this.title;
      this.bindComponent = this.injector.get(data.bindComponentType);
      this.allItems = data.allItems;
      const selectedItems = data.getSelectedItems(this.bindComponent);
      this.listSelected = this.allItems.map(item => _.find(selectedItems, item) != null);
      this.setSelectedItemsCallback = data.setSelectedItems;
      this.itemTemplate = data.getCustomTemplate?.(this.bindComponent);
    });
  }

  onClickOk() {
    const newItems = [];
    this.listSelected.forEach((selected, i) => {
      if (selected) {
        newItems.push(this.allItems[i]);
      }
    });
    this.setSelectedItemsCallback(this.bindComponent, newItems);
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
  get text(): string | null;
  get image(): string | null;
}

export interface SelectableItemTemplateContext<T> {
  item: T;
}

export interface GridSelectionData<T, U extends SelectableItem> {
  title: string;
  bindComponentType: Type<T>;
  allItems: U[];

  getSelectedItems(component: T): U[];
  setSelectedItems(component: T, items: U[]): void;
  getCustomTemplate?(component: T): TemplateRef<SelectableItemTemplateContext<U>>;
}
