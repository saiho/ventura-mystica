import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ControlContainer, NgForm, NgModel } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ArtifactPickMode, FactionPickMode } from 'src/app/model/game-setup-options';
import { Profile } from 'src/app/model/profile';
import { ScoringTile } from 'src/app/model/scoring-tile';
import { SelectableItemTemplateContext } from '../../pages/grid-selection/grid-selection.page';
import { GameSetupService } from '../../services/game-setup.service';

@Component({
  selector: 'app-game-setup-options',
  templateUrl: './game-setup-options.component.html',
  styleUrls: ['./game-setup-options.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class GameSetupOptionsComponent implements OnInit {

  @Input()
  playerNamesRequired = false;

  @ViewChild('factionsSelect')
  private factionsSelect: NgModel;

  @ViewChild('bonusCardsSelect')
  private bonusCardsSelect: NgModel;

  @ViewChild('scoringTilesSelect')
  private scoringTilesSelect: NgModel;

  @ViewChild('scoringTileTemplate', { static: true })
  private scoringTileTemplate: TemplateRef<SelectableItemTemplateContext<ScoringTile>>;

  readonly factionPickMode = FactionPickMode;
  readonly artifactPickMode = ArtifactPickMode;

  private preservePlayerNames = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private translate: TranslateService,
    public setup: GameSetupService
  ) {
  }

  @Input()
  set profile(profile: Profile) {
    profile.copyOptionsTo(this.setup, this.preservePlayerNames);
    if (profile.predefined && !this.preservePlayerNames) {
      // Translate default player names
      for (let i = 0; i < 5; i++) {
        this.translate.get(this.setup.playerNames[i]).subscribe(translation => this.setup.playerNames[i] = translation);
      }
    }
  }

  ngOnInit() {
    this.setup.scoringTileTemplate = this.scoringTileTemplate;
  }

  onNumPlayersChange() {
    this.changeDetectorRef.detectChanges(); // Force update values bound to the validator
    this.factionsSelect.control.updateValueAndValidity();
    this.bonusCardsSelect.control.updateValueAndValidity();
  }

  onPlayerNameChange() {
    this.preservePlayerNames = true;
  }

  onAllowTownScoring1stRoundChange() {
    this.changeDetectorRef.detectChanges(); // Force update values bound to the validator
    this.scoringTilesSelect.control.updateValueAndValidity();
  }

}
