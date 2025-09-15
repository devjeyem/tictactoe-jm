'use client';

import Square from './Square';
import { calculateWinner, isDraw } from '../utils/gameLogic';
import type { GameBoard, Player } from '../types/game';

interface BoardProps {
  squares: GameBoard;
  onSquareClick: (index: number) => void;
  currentPlayer: Player;
}

export default function Board({ squares, onSquareClick, currentPlayer }: BoardProps) {
  const result = calculateWinner(squares);
  const winner = result?.winner;
  const winningLine = result?.line || [];
  const isGameDraw = isDraw(squares);
  
  // Status display logic
  let status;
  if (winner) {
    status = (
      <div className="text-center p-4 bg-green-100 rounded-lg border-2 border-green-300">
        <span className="text-green-800 font-bold text-2xl">
          🎉 Winner: <span className={winner === 'X' ? 'text-blue-600' : 'text-red-600'}>{winner}</span>
        </span>
      </div>
    );
  } else if (isGameDraw) {
    status = (
      <div className="text-center p-4 bg-yellow-100 rounded-lg border-2 border-yellow-300">
        <span className="text-yellow-800 font-bold text-2xl">🤝 It's a Draw!</span>
      </div>
    );
  } else {
    status = (
      <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
        <span className="text-blue-800 text-xl">
          Next player: <span className={`font-bold text-2xl ${currentPlayer === 'X' ? 'text-blue-600' : 'text-red-600'}`}>
            {currentPlayer}
          </span>
        </span>
      </div>
    );
  }

  const handleSquareClick = (index: number) => {
    // Prevent clicks on occupied squares or when game is over
    if (winner || squares[index]) return;
    onSquareClick(index);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {status}
      
      <div className="grid grid-cols-3 gap-2 p-4 bg-gray-800 rounded-2xl shadow-xl">
        {squares.map((square, index) => (
          <Square
            key={index}
            value={square}
            onSquareClick={() => handleSquareClick(index)}
            isWinningSquare={winningLine.includes(index)}
          />
        ))}
      </div>
      
      {/* Game info */}
      <div className="text-center text-sm text-gray-600">
        <p>Click any empty square to make your move</p>
      </div>
    </div>
  );
}