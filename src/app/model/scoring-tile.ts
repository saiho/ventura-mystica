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

export class ScoringTile {
  public constructor(
    public readonly actionPhaseScoring: ActionPhaseScoring,
    public readonly endRoundRewardCondition: EndRoundRewardCondition,
    public readonly endRoundRewardConditionCount: number,
    public readonly endRoundReward: EndRoundRewardRewardType,
    public readonly endRoundRewardCount: number = 1) {
  }
}

export const SCORING_TILES_BASIC = [
  new ScoringTile(
    ActionPhaseScoring.dwelling,
    EndRoundRewardCondition.cultWater, 4, EndRoundRewardRewardType.priest),
  new ScoringTile(
    ActionPhaseScoring.dwelling,
    EndRoundRewardCondition.cultFire, 4, EndRoundRewardRewardType.power, 4),
  new ScoringTile(
    ActionPhaseScoring.tradingHouse,
    EndRoundRewardCondition.cultAir, 4, EndRoundRewardRewardType.spade),
  new ScoringTile(
    ActionPhaseScoring.tradingHouse,
    EndRoundRewardCondition.cultWater, 4, EndRoundRewardRewardType.spade),
  new ScoringTile(
    ActionPhaseScoring.level3Building,
    EndRoundRewardCondition.cultAir, 2, EndRoundRewardRewardType.worker),
  new ScoringTile(
    ActionPhaseScoring.level3Building,
    EndRoundRewardCondition.cultFire, 2, EndRoundRewardRewardType.worker),
  new ScoringTile(
    ActionPhaseScoring.spade,
    EndRoundRewardCondition.cultEarth, 1, EndRoundRewardRewardType.coin, 1),
  new ScoringTile(
    ActionPhaseScoring.town,
    EndRoundRewardCondition.cultEarth, 4, EndRoundRewardRewardType.spade)
];

export const SCORING_TILES_MINI_EXPANSION = [
  new ScoringTile(
    ActionPhaseScoring.temple,
    EndRoundRewardCondition.cultPriest, 1, EndRoundRewardRewardType.coin, 2)
];

export const SCORING_TILES_MERCHANTS = [
  new ScoringTile(
    ActionPhaseScoring.town,
    EndRoundRewardCondition.cultFire, 1, EndRoundRewardRewardType.coin, 1),
  new ScoringTile(
    ActionPhaseScoring.level3Building,
    EndRoundRewardCondition.cultFire, 4, EndRoundRewardRewardType.spade),
  new ScoringTile(
    ActionPhaseScoring.trade,
    EndRoundRewardCondition.cultFire, 4, EndRoundRewardRewardType.priest),
  new ScoringTile(
    ActionPhaseScoring.anyTrackUpgrade,
    EndRoundRewardCondition.cultWater, 2, EndRoundRewardRewardType.coin, 2),
  new ScoringTile(
    ActionPhaseScoring.tradingHouse,
    EndRoundRewardCondition.cultWater, 2, EndRoundRewardRewardType.worker),
  new ScoringTile(
    ActionPhaseScoring.dwelling,
    EndRoundRewardCondition.cultWater, 4, EndRoundRewardRewardType.ship),
  new ScoringTile(
    ActionPhaseScoring.level3Building,
    EndRoundRewardCondition.cultEarth, 2, EndRoundRewardRewardType.worker),
  new ScoringTile(
    ActionPhaseScoring.spade,
    EndRoundRewardCondition.cultEarth, 3, EndRoundRewardRewardType.power, 3),
  new ScoringTile(
    ActionPhaseScoring.temple,
    EndRoundRewardCondition.cultEarth, 5, EndRoundRewardRewardType.shippingUpgrade),
  new ScoringTile(
    ActionPhaseScoring.dwelling,
    EndRoundRewardCondition.cultAir, 1, EndRoundRewardRewardType.power, 1),
  new ScoringTile(
    ActionPhaseScoring.tradingHouse,
    EndRoundRewardCondition.cultAir, 4, EndRoundRewardRewardType.ship),
  new ScoringTile(
    ActionPhaseScoring.trade,
    EndRoundRewardCondition.cultAir, 4, EndRoundRewardRewardType.spade)
];

export const SCORING_TILES_ALL = [
  ...SCORING_TILES_BASIC,
  ...SCORING_TILES_MINI_EXPANSION,
  ...SCORING_TILES_MERCHANTS
];
