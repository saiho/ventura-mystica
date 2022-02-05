import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import * as _ from 'lodash';
import { BonusCard, BONUS_CARDS_ALL } from 'src/app/model/bonus-card';
import { ExtraFinalScoringTile, EXTRA_FINAL_SCORING_TILES_ALL } from 'src/app/model/extra-final-scoring-tile';
import { Faction, FACTIONS_ALL } from 'src/app/model/faction';
import { GameBoard } from 'src/app/model/game-board';
import { PREDEFINED_PROFILES } from 'src/app/model/profile';
import { ScoringTile } from 'src/app/model/scoring-tile';
import { SelectableItemTemplateContext } from 'src/app/shared/pages/grid-selection/grid-selection.page';
import { GameSetupService } from './game-setup.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss']
})
export class NewGamePage implements OnInit {


  @ViewChild('factionsSelect')
  private factionsSelect: NgModel;

  @ViewChild('bonusCardsSelect')
  private bonusCardsSelect: NgModel;

  @ViewChild('scoringTileTemplate', { static: true })
  private scoringTileTemplate: TemplateRef<SelectableItemTemplateContext<ScoringTile>>;

  readonly allProfiles = PREDEFINED_PROFILES;
  readonly allFactions = FACTIONS_ALL;
  readonly allBonusCards = BONUS_CARDS_ALL;
  readonly allExtraFinalScoringTiles = EXTRA_FINAL_SCORING_TILES_ALL;

  // Temp values
  maxNumFactions: number;
  generated = false;

  // Generated game setup
  pickedFactions: Faction[];
  pickedBonusCards: BonusCard[];
  pickedScoringTiles: ScoringTile[];
  pickedExtraFinalScoringTile: ExtraFinalScoringTile;
  pickedGameBoard: GameBoard;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public setup: GameSetupService
  ) {
  }

  ngOnInit() {
    this.setup.scoringTileTemplate = this.scoringTileTemplate;
    this.onProfileChange();
  }

  onProfileChange() {
    // Copy profile details (adjustments are lost when switching to another profile)
    this.setup.baseProfile.copyDeatilsTo(this.setup);
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
      _.sampleSize(_.groupBy(this.setup.factions, 'terrain'), this.setup.numFactions)
        .map(l => _.sample(l));
    this.pickedBonusCards = _.sampleSize(this.setup.bonusCards, this.setup.numPlayers + 3);
    this.pickedExtraFinalScoringTile = _.sample(this.setup.extraFinalScoringTiles);
    this.pickedGameBoard = _.sample(this.setup.gameBoards);
    this.generated = true;
  }

  private correctNumFactions() {
    this.maxNumFactions = _.uniqBy(this.setup.factions, 'terrain').length;
    if (this.setup.numFactions < this.setup.numPlayers) {
      this.setup.numFactions = this.setup.numPlayers;
    }
    if (this.setup.numFactions > this.maxNumFactions) {
      this.setup.numFactions = this.maxNumFactions;
    }
  }


}
