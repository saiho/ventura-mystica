import { SelectableItem } from '../shared/pages/grid-selection/grid-selection.page';

export class BonusCard implements SelectableItem {
  public constructor(
    public readonly description: string,
    public readonly official: boolean
  ) {
  }

  getName(): string {
    return this.description;
  }
}

export const BONUS_CARDS_BASIC = [
  new BonusCard('bonus-card.priest', true),
  new BonusCard('bonus-card.worker-and-power', true),
  new BonusCard('bonus-card.6-coins', true),
  new BonusCard('bonus-card.power-and-shipping', true),
  new BonusCard('bonus-card.spade-and-coins', true),
  new BonusCard('bonus-card.cult-track-and-coins', true),
  new BonusCard('bonus-card.points-dwelling-and-coins', true),
  new BonusCard('bonus-card.points-trading-house-and-worker', true),
  new BonusCard('bonus-card.points-3rd-building-and-workers', true)
];

export const BONUS_CARDS_MINI_EXPANSION = [
  new BonusCard('bonus-card.points-shipping-and-power', true)
];

export const BONUS_CARDS_MERCHANTS = [
  new BonusCard('bonus-card.points-trade-and-ship', true),
  new BonusCard('bonus-card.points-ships-coind-and-worker', true),
  new BonusCard('bonus-card.move-ships-and-ship', true)
];

export const BONUS_CARDS_ALL = [
  ...BONUS_CARDS_BASIC,
  ...BONUS_CARDS_MINI_EXPANSION,
  ...BONUS_CARDS_MERCHANTS
];
