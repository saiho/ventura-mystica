import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss'],
})
export class NewGamePage implements OnInit {

  numPlayers = 2;
  numFactions = 3;
  extensionFireIce = true;
  extensionMerchants = true;

  constructor() { }

  ngOnInit() {
  }

  onNumPlayersChange(value: string) {
    this.numPlayers = Number(value);
    if (this.numFactions < this.numPlayers) {
      this.numFactions = this.numPlayers;
    }
  }

  onClickGenerate() {
    console.log('Click');
  }

}
