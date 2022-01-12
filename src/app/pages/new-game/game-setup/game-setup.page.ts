import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import * as _ from 'lodash';
import { BonusCard, BONUS_CARDS_ALL } from 'src/app/model/bonus-card';
import { ExtraFinalScoringTile, EXTRA_FINAL_SCORING_TILES_ALL } from 'src/app/model/extra-final-scoring-tile';
import { Faction, FACTIONS_ALL } from 'src/app/model/faction';
import { BASIC_PROFILE, PREDEFINED_PROFILES, Profile, ProfileDetails } from 'src/app/model/profile';
import { ScoringTile } from 'src/app/model/scoring-tile';
import { ScoringTilesRef } from '../scoring-tiles/scoring-tiles-ref';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.page.html',
  styleUrls: ['./game-setup.page.scss'],
})
export class GameSetupPage implements OnInit, ProfileDetails {

  @ViewChild('factionsSelect')
  private factionsSelect: NgModel;

  @ViewChild('bonusCardsSelect')
  private bonusCardsSelect: NgModel;

  readonly allProfiles = PREDEFINED_PROFILES;
  readonly allFactions = FACTIONS_ALL;
  readonly allBonusCards = BONUS_CARDS_ALL;
  readonly allExtraFinalScoringTiles = EXTRA_FINAL_SCORING_TILES_ALL;

  // Selected profile
  baseProfile: Profile = BASIC_PROFILE;
  // Game settings (extracted from the base profile)
  factions: Faction[];
  bonusCards: BonusCard[];
  scoringTiles: ScoringTile[];
  extraFinalScoringTiles: ExtraFinalScoringTile[];
  numPlayers: number;
  numFactions: number;
  // Temp values
  maxNumFactions: number;
  generated = false;
  // Generated game setup
  pickedFactions: Faction[];
  pickedBonusCards: BonusCard[];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private scoringTilesRef: ScoringTilesRef
  ) {
    this.scoringTilesRef.setCallbacks(
      () => this.scoringTiles,
      value => { this.scoringTiles = value; });
  }

  ngOnInit() {
    this.onProfileChange();
  }

  onProfileChange() {
    // Copy profile details, so adjustments are lost when switching to another profile
    this.baseProfile.copyDeatilsTo(this);
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
      _.sampleSize(_.groupBy(this.factions, 'terrain'), this.numFactions)
        .map(l => _.sample(l));
    this.pickedBonusCards = _.sampleSize(this.bonusCards, this.numPlayers + 3);
    this.generated = true;
  }

  private correctNumFactions() {
    this.maxNumFactions = _.uniqBy(this.factions, 'terrain').length;
    if (this.numFactions < this.numPlayers) {
      this.numFactions = this.numPlayers;
    }
    if (this.numFactions > this.maxNumFactions) {
      this.numFactions = this.maxNumFactions;
    }
  }

}