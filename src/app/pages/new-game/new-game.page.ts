import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import * as _ from 'lodash';
import { filter, Subscription } from 'rxjs';
import { BonusCard, BONUS_CARDS_ALL } from 'src/app/model/bonus-card';
import { ExtraFinalScoringTile, EXTRA_FINAL_SCORING_TILES_ALL } from 'src/app/model/extra-final-scoring-tile';
import { Faction, FACTIONS_ALL } from 'src/app/model/faction';
import { GameBoard } from 'src/app/model/game-board';
import { PREDEFINED_PROFILES } from 'src/app/model/profile';
import { ScoringTile } from 'src/app/model/scoring-tile';
import { TOTAL_ROUNDS } from 'src/app/shared/constants';
import { SelectableItemTemplateContext } from 'src/app/shared/pages/grid-selection/grid-selection.page';
import { isValidCombinationScoringTiles } from 'src/app/shared/validations/scoring-tiles-validator.directive';
import { GameSetupService } from './game-setup.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss']
})
export class NewGamePage implements OnInit, OnDestroy {


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

  private routerUrl: string;
  private routerEventsSubscription: Subscription;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    public setup: GameSetupService
  ) {
  }

  ngOnInit() {
    this.setup.scoringTileTemplate = this.scoringTileTemplate;
    this.onProfileChange();

    // Monitor events after page is loaded to detected changes done externally
    this.routerUrl = this.router.url;
    this.routerEventsSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd && event.url === this.routerUrl))
      .subscribe((event: NavigationEnd) => this.onNavigationEnd(event));
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();
  }

  onNavigationEnd(event: NavigationEnd) {
    // Review changes done externally
    this.correctNumFactions();
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

  onClickGenerate() {
    // Group factions by terrain (color)
    // Pick randomly as many terrains as players
    // Pick randomly faction of each terrain
    this.pickedFactions =
      _.sampleSize(_.groupBy(this.setup.factions, 'terrain'), this.setup.numFactions)
        .map(l => _.sample(l));

    // Pick bonus cards randomly
    this.pickedBonusCards = _.sampleSize(this.setup.bonusCards, this.setup.numPlayers + 3);

    // Pick scoring tiles randomly
    let maxIter = 100; /* Safe guard: try max 100 times to get a valid combination. The generate button should not be
                          enabled unless there is a valid combination, but still be sure to avoid infinite loops. */
    do {
      this.pickedScoringTiles = _.sampleSize(this.setup.scoringTiles, TOTAL_ROUNDS);
      maxIter--;
    } while (
      !isValidCombinationScoringTiles(this.pickedScoringTiles, { allowCityScoring1stRound: this.setup.allowCityScoring1stRound })
      && maxIter >= 0);

    // Pick extra final scoring tile randomly
    this.pickedExtraFinalScoringTile = _.sample(this.setup.extraFinalScoringTiles);

    // Pick game board randomly
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
