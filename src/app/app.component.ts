import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'New game', url: '/new-game', icon: 'color-wand' },
    { title: 'Settings', url: '/settings', icon: 'settings' },
  ];
  constructor() { }
}
