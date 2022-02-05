import { SelectableItem } from '../shared/pages/grid-selection/grid-selection.page';

export class GameBoard implements SelectableItem {
  public constructor(
    public readonly name: string
  ) {
  }

  getName(): string {
    return this.name;
  }
}

export const GAME_BOARDS_BASIC = [
  new GameBoard('game-board.original')
];

export const GAME_BOARDS_FIRE_ICE = [
  new GameBoard('game-board.original-revised'),
  new GameBoard('game-board.fire-ice-variant')
];

export const GAME_BOARDS_MERCHANTS = [
  new GameBoard('game-board.fjords'),
  new GameBoard('game-board.lakes')
];

export const GAME_BOARDS_ALL = [
  ...GAME_BOARDS_BASIC,
  ...GAME_BOARDS_FIRE_ICE,
  ...GAME_BOARDS_MERCHANTS
];
