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
  scoringTilesChecked: boolean[];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.scoringTiles = this.router.getCurrentNavigation().extras.state.scoringTiles;
    this.scoringTilesChecked = this.allScoringTiles.map(scoringTile => _.find(this.scoringTiles, scoringTile) != null);
  }

  onClickOk() {
    const newScoringTiles: ScoringTile[] = [];
    this.scoringTilesChecked.forEach((checked, i) => {
      if (checked) {
        newScoringTiles.push(SCORING_TILES_ALL[i]);
      }
    });

    this.router.navigate(['..'], // Go to parent route
      {
        state: { scoringTiles: newScoringTiles }, // Pass new scoring tiles back
        relativeTo: this.route,
        replaceUrl: true // Prevent going forward in history after clicking ok/cancel by replacing the last history state
      });
  }

  onClickCancel() {
    this.router.navigate(['..'], // Go to parent route
      {
        relativeTo: this.route,
        replaceUrl: true // Prevent going forward in history after clicking ok/cancel by replacing the last history state
      });
  }

}
