import { SelectableItem } from '../shared/pages/grid-selection/grid-selection.page';
import { Expansion } from './expansion';

export class ExtraFinalScoringTile implements SelectableItem {
  public constructor(
    public readonly name: string,
    public readonly expansion: Expansion
  ) {
  }

  getName(): string {
    return this.name;
  }
}

export const EXTRA_FINAL_SCORING_TILES_FIRE_ICE = [
  new ExtraFinalScoringTile('final-scoring-tile.greatest-distance', Expansion.fireIce),
  new ExtraFinalScoringTile('final-scoring-tile.distance-stronghold-sanctuary', Expansion.fireIce),
  new ExtraFinalScoringTile('final-scoring-tile.outpost', Expansion.fireIce),
  new ExtraFinalScoringTile('final-scoring-tile.settlements', Expansion.fireIce)
];

export const EXTRA_FINAL_SCORING_TILES_MERCHANTS = [
  new ExtraFinalScoringTile('final-scoring-tile.trade-markers', Expansion.merchants)
];

export const EXTRA_FINAL_SCORING_TILES_ALL = [
  ...EXTRA_FINAL_SCORING_TILES_FIRE_ICE,
  ...EXTRA_FINAL_SCORING_TILES_MERCHANTS
];
