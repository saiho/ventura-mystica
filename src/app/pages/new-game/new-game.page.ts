import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import * as _ from 'lodash';
import { BonusCard, BONUS_CARDS_ALL } from 'src/app/model/bonus-card';
import { BASIC_PROFILE, PREDEFINED_PROFILES, Profile } from 'src/app/model/profile';
import { Faction, FACTIONS_ALL } from '../../model/faction';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss'],
})
export class NewGamePage implements OnInit {

  @ViewChild('factionsSelect')
  private factionsSelect: NgModel;

  @ViewChild('bonusCardsSelect')
  private bonusCardsSelect: NgModel;

  profile: Profile = BASIC_PROFILE.clone();
  maxNumFactions = 0;
  generated = false;
  pickedFactions: Faction[];
  pickedBonusCards: BonusCard[];

  readonly allProfiles = PREDEFINED_PROFILES;
  readonly allFactions = FACTIONS_ALL;
  readonly allBonusCards = BONUS_CARDS_ALL;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.correctNumFactions();
  }

  ngOnInit() { }

  onProfileModelChange(value: Profile) {
    // Clone the profile so temporal adjustments are not preserved when switching to another profile
    this.profile = value.clone();
    this.correctNumFactions();
  }

  onNumPlayersChange() {
    this.correctNumFactions();
    this.changeDetectorRef.detectChanges(); // Force update values bound to the validator
    this.factionsSelect.control.updateValueAndValidity();
    this.bonusCardsSelect.control.updateValueAndValidity();
  }

  onFactionsChange() {
    this.correctNumFactions();
  }

  onClickGenerate() {
    // Group factions by terrain (color)
    // Pick randomly as many terrains as players
    // Pick randomly faction of each terrain
    this.pickedFactions =
      _.sampleSize(_.groupBy(this.profile.factions, 'terrain'), this.profile.numFactions)
        .map(l => _.sample(l));
    this.pickedBonusCards = _.sampleSize(this.profile.bonusCards, this.profile.numPlayers + 3);
    this.generated = true;
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
