import { SelectableItem } from '../shared/pages/grid-selection/grid-selection.page';

export class ExtraFinalScoringTile implements SelectableItem {
  public constructor(
    public readonly name: string
  ) {
  }

  getName(): string {
    return this.name;
  }
}

export const EXTRA_FINAL_SCORING_TILES_FIRE_ICE = [
  new ExtraFinalScoringTile('final-scoring-tile.greatest-distance'),
  new ExtraFinalScoringTile('final-scoring-tile.distance-stronghold-sanctuary'),
  new ExtraFinalScoringTile('final-scoring-tile.outpost'),
  new ExtraFinalScoringTile('final-scoring-tile.settlements')
];

export const EXTRA_FINAL_SCORING_TILES_MERCHANTS = [
  new ExtraFinalScoringTile('final-scoring-tile.trade-markers')
];

export const EXTRA_FINAL_SCORING_TILES_ALL = [
  ...EXTRA_FINAL_SCORING_TILES_FIRE_ICE,
  ...EXTRA_FINAL_SCORING_TILES_MERCHANTS
];
