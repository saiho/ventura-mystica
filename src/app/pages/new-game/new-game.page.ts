import { Component, OnInit } from '@angular/core';
import { Profile, BASIC_PROFILE, PREDEFINED_PROFILES } from 'src/app/model/profile';
import { Factions } from '../../model/faction';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss'],
})
export class NewGamePage implements OnInit {

  profile: Profile = BASIC_PROFILE.clone();
  allProfiles: Profile[] = PREDEFINED_PROFILES;
  allFactions: Factions[] = Object.values(Factions);

  constructor() { }

  ngOnInit() { }

  onProfileChange(value: Profile) {
    this.profile = value.clone();
  }

  onNumPlayersChange(value: string) {
    this.profile.numPlayers = Number(value);
    this.correctNumFactions();
  }

  onFactionsChange(value: Factions[]) {
    this.profile.factions = value;
    this.correctNumFactions();
  }

  onClickGenerate() {
    console.log('Click');
  }

  sameProfile(p1: Profile, p2: Profile) {
    return p1 && p2 && p1.name === p2.name;
  }

  private correctNumFactions() {
    if (this.profile.numFactions < this.profile.numPlayers) {
      this.profile.numFactions = this.profile.numPlayers;
    }
    if (this.profile.numFactions > this.profile.factions.length) {
      this.profile.numFactions = this.profile.factions.length;
    }
  }

}
