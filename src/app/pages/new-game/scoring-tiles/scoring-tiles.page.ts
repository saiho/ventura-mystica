import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { ScoringTile, SCORING_TILES_ALL } from 'src/app/model/scoring-tile';

@Component({
  selector: 'app-scoring-tiles',
  templateUrl: './scoring-tiles.page.html',
  styleUrls: ['./scoring-tiles.page.scss'],
})
export class ScoringTilesPage implements OnInit {

  readonly allScoringTiles = SCORING_TILES_ALL;

  scoringTiles: ScoringTile[];
  scoringTileSelected: boolean[];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.scoringTiles = this.router.getCurrentNavigation().extras.state.scoringTiles;
    this.scoringTileSelected = this.allScoringTiles.map(scoringTile => _.find(this.scoringTiles, scoringTile) != null);
  }

  onClickOk() {
    // Update the input (without creating a new array instance) including the selected scoring tiles
    this.scoringTiles.length = 0;
    this.scoringTileSelected.forEach((selected, i) => {
      if (selected) {
        this.scoringTiles.push(SCORING_TILES_ALL[i]);
      }
    });
    this.onClickCancel();
  }

  onClickCancel() {
    this.router.navigate(['..'], // Go to parent route
      {
        relativeTo: this.route,
        replaceUrl: true // Prevent going forward in history after clicking ok/cancel by replacing the last history state
      });
  }

}
