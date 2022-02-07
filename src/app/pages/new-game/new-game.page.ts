import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { filter, Subscription } from 'rxjs';
import { BASIC_PROFILE, PREDEFINED_PROFILES, Profile } from 'src/app/model/profile';
import { ScoringTile } from 'src/app/model/scoring-tile';
import { SelectableItemTemplateContext } from 'src/app/shared/pages/grid-selection/grid-selection.page';
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

  // Selected profile
  baseProfile: Profile = BASIC_PROFILE;

  // Temp values
  maxNumFactions: number;

  private routerUrl: string;
  private routerEventsSubscription: Subscription;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private translate: TranslateService,
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
    this.calculateMaxNumFactions();
  }

  onProfileChange() {
    // Copy profile options (adjustments are lost when switching to another profile)
    this.baseProfile.copyOptionsTo(this.setup);
    this.fillMissingPlayerNames();
    this.calculateMaxNumFactions();
  }

  onNumPlayersChange() {
    this.changeDetectorRef.detectChanges(); // Force update values bound to the validator
    this.factionsSelect.control.updateValueAndValidity();
    this.bonusCardsSelect.control.updateValueAndValidity();
  }

  fillMissingPlayerNames() {
    for (let i = 0; i < 5; i++) {
      const name = this.setup.playerNames[i];
      if (!name || name.trim() === '') {
        this.translate.get('default-player-name.' + (i + 1)).subscribe(translation => this.setup.playerNames[i] = translation);
      } else {
        this.setup.playerNames[i] = name.trim();
      }
    }
  }

  private calculateMaxNumFactions() {
    this.maxNumFactions = _.uniqBy(this.setup.factions, 'terrain').length;
  }

}
