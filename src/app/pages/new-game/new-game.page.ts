import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BASIC_PROFILE, PREDEFINED_PROFILES, Profile } from 'src/app/model/profile';
import { ScoringTile } from 'src/app/model/scoring-tile';
import { SelectableItemTemplateContext } from 'src/app/shared/pages/grid-selection/grid-selection.page';
import { GameSetupService } from '../../shared/services/game-setup.service';

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

  @ViewChild('scoringTilesSelect')
  private scoringTilesSelect: NgModel;

  @ViewChild('scoringTileTemplate', { static: true })
  private scoringTileTemplate: TemplateRef<SelectableItemTemplateContext<ScoringTile>>;

  readonly allProfiles = PREDEFINED_PROFILES;

  // Selected profile
  baseProfile: Profile = BASIC_PROFILE;

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
  }

  onProfileChange() {
    // Copy profile options (adjustments are lost when switching to another profile)
    this.baseProfile.copyOptionsTo(this.setup);
    this.onPlayerNameChange();
  }

  onNumPlayersChange() {
    this.changeDetectorRef.detectChanges(); // Force update values bound to the validator
    this.factionsSelect.control.updateValueAndValidity();
    this.bonusCardsSelect.control.updateValueAndValidity();
  }

  onAllowTownScoring1stRoundChange() {
    this.changeDetectorRef.detectChanges(); // Force update values bound to the validator
    this.scoringTilesSelect.control.updateValueAndValidity();
  }

  onPlayerNameChange() {
    // Fill missing player names
    for (let i = 0; i < 5; i++) {
      const name = this.setup.playerNames[i];
      if (!name || name.trim() === '') {
        this.translate.get('default-player-name.' + (i + 1)).subscribe(translation => this.setup.playerNames[i] = translation);
      } else {
        this.setup.playerNames[i] = name.trim();
      }
    }
  }

}
