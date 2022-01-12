import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { ScoringTile, SCORING_TILES_ALL } from 'src/app/model/scoring-tile';
import { ScoringTilesRef } from './scoring-tiles-ref';

@Component({
  selector: 'app-scoring-tiles',
  templateUrl: './scoring-tiles.page.html',
  styleUrls: ['./scoring-tiles.page.scss'],
})
export class ScoringTilesPage implements OnInit {

  readonly allScoringTiles = SCORING_TILES_ALL;

  scoringTilesChecked: boolean[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private scoringTilesRef: ScoringTilesRef
  ) {
  }

  ngOnInit() {
    const scoringTiles = this.scoringTilesRef.getValue();
    this.scoringTilesChecked = this.allScoringTiles.map(scoringTile => _.find(scoringTiles, scoringTile) != null);
  }

  onClickOk() {
    const newScoringTiles: ScoringTile[] = [];
    this.scoringTilesChecked.forEach((checked, i) => {
      if (checked) {
        newScoringTiles.push(SCORING_TILES_ALL[i]);
      }
    });
    this.scoringTilesRef.setValue(newScoringTiles);
    this.onClickCancel(); // Go back
  }

  onClickCancel() {
    this.router.navigate(['..'], // Go to parent route
      {
        relativeTo: this.route,
        replaceUrl: true // Prevent going forward in history after clicking ok/cancel by replacing the last history state
      });
    this.location.back(); // This does nothing, because it goes also to the parent route, but avoids accumulating history changes
  }

}
