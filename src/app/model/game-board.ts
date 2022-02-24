import { SelectableItem } from '../shared/pages/grid-selection/grid-selection.page';
import { Expansion } from './expansion';

export class GameBoard implements SelectableItem {
  public constructor(
    public readonly name: string,
    public readonly expansion: Expansion
  ) {
  }

  getName(): string {
    return this.name;
  }
}

export const GAME_BOARDS_BASIC = [
  new GameBoard('game-board.original', Expansion.basic)
];

export const GAME_BOARDS_FIRE_ICE = [
  new GameBoard('game-board.original-revised', Expansion.fireIce),
  new GameBoard('game-board.fire-ice-variant', Expansion.fireIce)
];

export const GAME_BOARDS_MERCHANTS = [
  new GameBoard('game-board.fjords', Expansion.merchants),
  new GameBoard('game-board.lakes', Expansion.merchants)
];

export const GAME_BOARDS_ALL = [
  ...GAME_BOARDS_BASIC,
  ...GAME_BOARDS_FIRE_ICE,
  ...GAME_BOARDS_MERCHANTS
];
