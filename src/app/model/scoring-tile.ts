import { SelectableItem } from '../shared/pages/grid-selection/grid-selection.page';
import { Expansion } from './expansion';

export enum ActionPhaseScoring {
  dwelling = 'action-phase-scoring.dwelling',
  tradingHouse = 'action-phase-scoring.trading-house',
  level3Building = 'action-phase-scoring.level-3-building',
  spade = 'action-phase-scoring.spade',
  town = 'action-phase-scoring.town',
  temple = 'action-phase-scoring.temple',
  trade = 'action-phase-scoring.trade',
  anyTrackUpgrade = 'action-phase-scoring.any-track-upgrade'
};

export enum EndRoundRewardCondition {
  cultFire = 'reward-condition.cult-fire',
  cultWater = 'reward-condition.cult-water',
  cultEarth = 'reward-condition.cult-earth',
  cultAir = 'reward-condition.cult-air',
  cultPriest = 'reward-condition.priest'
};

export enum EndRoundRewardRewardType {
  priest = 'reward-type.priest',
  power = 'reward-type.power',
  coin = 'reward-type.coin',
  worker = 'reward-type.worker',
  spade = 'reward-type.spade',
  ship = 'reward-type.ship',
  shippingUpgrade = 'reward-type.shipping-upgrade'
};

export class ScoringTile implements SelectableItem {
  public constructor(
    public readonly actionPhaseScoring: ActionPhaseScoring,
    public readonly endRoundRewardCondition: EndRoundRewardCondition,
    public readonly endRoundRewardConditionCount: number,
    public readonly endRoundReward: EndRoundRewardRewardType,
    public readonly endRoundRewardCount: number = 1,
    public readonly expansion: Expansion
  ) {
  }

  getName(): string | null {
    return null; // Use template for showing description
  }
}

export const SCORING_TILES_BASIC = [
  new ScoringTile(
    ActionPhaseScoring.dwelling,
    EndRoundRewardCondition.cultWater, 4, EndRoundRewardRewardType.priest, 1,
    Expansion.basic),
  new ScoringTile(
    ActionPhaseScoring.dwelling,
    EndRoundRewardCondition.cultFire, 4, EndRoundRewardRewardType.power, 4,
    Expansion.basic),
  new ScoringTile(
    ActionPhaseScoring.tradingHouse,
    EndRoundRewardCondition.cultAir, 4, EndRoundRewardRewardType.spade, 1,
    Expansion.basic),
  new ScoringTile(
    ActionPhaseScoring.tradingHouse,
    EndRoundRewardCondition.cultWater, 4, EndRoundRewardRewardType.spade, 1,
    Expansion.basic),
  new ScoringTile(
    ActionPhaseScoring.level3Building,
    EndRoundRewardCondition.cultAir, 2, EndRoundRewardRewardType.worker, 1,
    Expansion.basic),
  new ScoringTile(
    ActionPhaseScoring.level3Building,
    EndRoundRewardCondition.cultFire, 2, EndRoundRewardRewardType.worker, 1,
    Expansion.basic),
  new ScoringTile(
    ActionPhaseScoring.spade,
    EndRoundRewardCondition.cultEarth, 1, EndRoundRewardRewardType.coin, 1,
    Expansion.basic),
  new ScoringTile(
    ActionPhaseScoring.town,
    EndRoundRewardCondition.cultEarth, 4, EndRoundRewardRewardType.spade, 1,
    Expansion.basic)
];

export const SCORING_TILES_MINI_EXPANSION = [
  new ScoringTile(
    ActionPhaseScoring.temple,
    EndRoundRewardCondition.cultPriest, 1, EndRoundRewardRewardType.coin, 2,
    Expansion.miniExpansion)
];

export const SCORING_TILES_MERCHANTS = [
  new ScoringTile(
    ActionPhaseScoring.town,
    EndRoundRewardCondition.cultFire, 1, EndRoundRewardRewardType.coin, 1,
    Expansion.merchants),
  new ScoringTile(
    ActionPhaseScoring.level3Building,
    EndRoundRewardCondition.cultFire, 4, EndRoundRewardRewardType.spade, 1,
    Expansion.merchants),
  new ScoringTile(
    ActionPhaseScoring.trade,
    EndRoundRewardCondition.cultFire, 4, EndRoundRewardRewardType.priest, 1,
    Expansion.merchants),
  new ScoringTile(
    ActionPhaseScoring.anyTrackUpgrade,
    EndRoundRewardCondition.cultWater, 2, EndRoundRewardRewardType.coin, 2,
    Expansion.merchants),
  new ScoringTile(
    ActionPhaseScoring.tradingHouse,
    EndRoundRewardCondition.cultWater, 2, EndRoundRewardRewardType.worker, 1,
    Expansion.merchants),
  new ScoringTile(
    ActionPhaseScoring.dwelling,
    EndRoundRewardCondition.cultWater, 4, EndRoundRewardRewardType.ship, 1,
    Expansion.merchants),
  new ScoringTile(
    ActionPhaseScoring.level3Building,
    EndRoundRewardCondition.cultEarth, 2, EndRoundRewardRewardType.worker, 1,
    Expansion.merchants),
  new ScoringTile(
    ActionPhaseScoring.spade,
    EndRoundRewardCondition.cultEarth, 3, EndRoundRewardRewardType.power, 3,
    Expansion.merchants),
  new ScoringTile(
    ActionPhaseScoring.temple,
    EndRoundRewardCondition.cultEarth, 5, EndRoundRewardRewardType.shippingUpgrade, 1,
    Expansion.merchants),
  new ScoringTile(
    ActionPhaseScoring.dwelling,
    EndRoundRewardCondition.cultAir, 1, EndRoundRewardRewardType.power, 1,
    Expansion.merchants),
  new ScoringTile(
    ActionPhaseScoring.tradingHouse,
    EndRoundRewardCondition.cultAir, 4, EndRoundRewardRewardType.ship, 1,
    Expansion.merchants),
  new ScoringTile(
    ActionPhaseScoring.trade,
    EndRoundRewardCondition.cultAir, 4, EndRoundRewardRewardType.spade, 1,
    Expansion.merchants)
];

export const SCORING_TILES_ALL = [
  ...SCORING_TILES_BASIC,
  ...SCORING_TILES_MINI_EXPANSION,
  ...SCORING_TILES_MERCHANTS
];
