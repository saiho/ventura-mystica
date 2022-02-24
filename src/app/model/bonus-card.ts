import { SelectableItem } from '../shared/pages/grid-selection/grid-selection.page';
import { Expansion } from './expansion';

export class BonusCard implements SelectableItem {
  public constructor(
    public readonly description: string,
    public readonly expansion: Expansion
  ) {
  }

  getName(): string {
    return this.description;
  }
}

export const BONUS_CARDS_BASIC = [
  new BonusCard('bonus-card.priest', Expansion.basic),
  new BonusCard('bonus-card.worker-and-power', Expansion.basic),
  new BonusCard('bonus-card.6-coins', Expansion.basic),
  new BonusCard('bonus-card.power-and-shipping', Expansion.basic),
  new BonusCard('bonus-card.spade-and-coins', Expansion.basic),
  new BonusCard('bonus-card.cult-track-and-coins', Expansion.basic),
  new BonusCard('bonus-card.points-dwelling-and-coins', Expansion.basic),
  new BonusCard('bonus-card.points-trading-house-and-worker', Expansion.basic),
  new BonusCard('bonus-card.points-3rd-building-and-workers', Expansion.basic)
];

export const BONUS_CARDS_MINI_EXPANSION = [
  new BonusCard('bonus-card.points-shipping-and-power', Expansion.miniExpansion)
];

export const BONUS_CARDS_MERCHANTS = [
  new BonusCard('bonus-card.points-trade-and-ship', Expansion.merchants),
  new BonusCard('bonus-card.points-ships-coind-and-worker', Expansion.merchants),
  new BonusCard('bonus-card.move-ships-and-ship', Expansion.merchants)
];

export const BONUS_CARDS_ALL = [
  ...BONUS_CARDS_BASIC,
  ...BONUS_CARDS_MINI_EXPANSION,
  ...BONUS_CARDS_MERCHANTS
];
