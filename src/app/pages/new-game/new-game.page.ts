import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ScoringTile } from 'src/app/model/scoring-tile';
import { SelectableItemTemplateContext } from 'src/app/shared/pages/grid-selection/grid-selection.page';
import { GameSetupService } from './game-setup/game-setup.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html'
})
export class NewGamePage implements OnInit {


  @ViewChild('scoringTileTemplate', { static: true })
  private scoringTileTemplate: TemplateRef<SelectableItemTemplateContext<ScoringTile>>;

  constructor(public setup: GameSetupService) { }

  ngOnInit() {
    this.setup.scoringTileTemplate = this.scoringTileTemplate;
  }

}
