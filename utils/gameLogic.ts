import type { GameBoard, Player, WinResult } from '../types/game';

export function calculateWinner(squares: GameBoard): WinResult | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { 
        winner: squares[a] as Player, 
        line: [a, b, c] 
      };
    }
  }
  return null;
}

export function isDraw(squares: GameBoard): boolean {
  return squares.every(square => square !== null) && !calculateWinner(squares);
}

export function getNextPlayer(currentMove: number): Player {
  return currentMove % 2 === 0 ? 'X' : 'O';
}

export function isSquareAvailable(squares: GameBoard, index: number): boolean {
  return squares[index] === null;
}

export function getGameStats(squares: GameBoard, moveCount: number) {
  const winner = calculateWinner(squares);
  const isGameDraw = isDraw(squares);
  
  return {
    totalMoves: moveCount,
    currentMove: moveCount,
    isGameOver: !!winner || isGameDraw,
    isDraw: isGameDraw,
    winner: winner?.winner || null
  };
}