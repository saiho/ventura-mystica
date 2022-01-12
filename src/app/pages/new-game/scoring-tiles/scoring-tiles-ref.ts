import { Injectable } from '@angular/core';
import { ValueRef } from 'src/app/common/value-ref';
import { ScoringTile } from 'src/app/model/scoring-tile';

@Injectable({
  providedIn: 'root'
})
export class ScoringTilesRef extends ValueRef<ScoringTile[]> {
}
