import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { BASIC_PROFILE, PREDEFINED_PROFILES, Profile } from 'src/app/model/profile';
import { Faction, FACTIONS_ALL } from '../../model/faction';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss'],
})
export class NewGamePage implements OnInit {

  profile: Profile = BASIC_PROFILE.clone();
  pickedFactions: Faction[];
  maxNumFactions = 0;

  readonly allProfiles = PREDEFINED_PROFILES;
  readonly allFactions = FACTIONS_ALL;

  constructor() {
    this.correctNumFactions();
  }

  ngOnInit() { }

  onProfileChange(value: Profile) {
    this.profile = value.clone();
    this.correctNumFactions();
  }

  onNumPlayersChange(value: number) {
    this.profile.numPlayers = value;
    this.correctNumFactions();
  }

  onFactionsChange(value: Faction[]) {
    this.profile.factions = value;
    this.correctNumFactions();
  }

  onClickGenerate() {
    // Group factions by terrain (color)
    // Pick randomly as many terrains as players
    // Pick randomly faction of each terrain
    this.pickedFactions =
      _.sampleSize(_.groupBy(this.profile.factions, 'terrain'), this.profile.numFactions)
        .map(l => _.sample(l));
  }

  sameProfile(p1: Profile, p2: Profile) {
    return p1 && p2 && p1.name === p2.name;
  }

  private correctNumFactions() {
    this.maxNumFactions = _.uniqBy(this.profile.factions, 'terrain').length;
    if (this.profile.numFactions < this.profile.numPlayers) {
      this.profile.numFactions = this.profile.numPlayers;
    }
    if (this.profile.numFactions > this.maxNumFactions) {
      this.profile.numFactions = this.maxNumFactions;
    }
  }

}
