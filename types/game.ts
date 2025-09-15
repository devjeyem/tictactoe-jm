export type Player = 'X' | 'O';
export type SquareValue = Player | null;
export type GameBoard = SquareValue[];

export interface GameState {
  history: GameBoard[];
  currentMove: number;
}

export interface WinResult {
  winner: Player;
  line: number[];
}