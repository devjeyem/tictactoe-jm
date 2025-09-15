'use client';

import { useState } from 'react';
import Board from './Board';
import { getNextPlayer } from '../utils/gameLogic';
import type { GameState, GameBoard } from '../types/game';

export default function Game() {
  const [gameState, setGameState] = useState<GameState>({
    history: [Array(9).fill(null)],
    currentMove: 0
  });

  const currentSquares = gameState.history[gameState.currentMove];
  const currentPlayer = getNextPlayer(gameState.currentMove);

  const handlePlay = (newSquares: GameBoard) => {
    const nextHistory = [
      ...gameState.history.slice(0, gameState.currentMove + 1),
      newSquares
    ];
    setGameState({
      history: nextHistory,
      currentMove: nextHistory.length - 1
    });
  };

  const handleSquareClick = (index: number) => {
    const newSquares = [...currentSquares];
    newSquares[index] = currentPlayer;
    handlePlay(newSquares);
  };

  const jumpToMove = (move: number) => {
    setGameState(prev => ({ ...prev, currentMove: move }));
  };

  const resetGame = () => {
    setGameState({
      history: [Array(9).fill(null)],
      currentMove: 0
    });
  };

  const moves = gameState.history.map((_, move) => {
    const description = move === 0 ? 'Game start' : `Move #${move}`;
    const isCurrentMove = move === gameState.currentMove;

    return (
      <li key={move}>
        <button
          onClick={() => jumpToMove(move)}
          className={`w-full px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                     ${isCurrentMove
              ? 'bg-blue-600 text-white shadow ring-2 ring-blue-300'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-white to-cyan-300 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 drop-shadow-sm">
            Tic-Tac-Toe
          </h1>
          <p className="text-lg text-gray-600">Classic fun with a modern twist!</p>
        </header>

        {/* Main Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Game Board */}
          <div className="flex justify-center">
            <Board
              squares={currentSquares}
              onSquareClick={handleSquareClick}
              currentPlayer={currentPlayer}
            />
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 shadow-inner">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Game Stats</h3>
            <div className="grid grid-cols-3 text-center gap-4">
              <div>
                <p className="text-gray-600">Current Move</p>
                <p className="font-bold text-blue-600">{gameState.currentMove}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Moves</p>
                <p className="font-bold text-green-600">{gameState.history.length - 1}</p>
              </div>
              <div>
                <p className="text-gray-600">Next Player</p>
                <p className="font-bold text-purple-600">{currentPlayer}</p>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="bg-gray-50 rounded-xl p-5 shadow">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800">Move History</h2>
              <button
                onClick={resetGame}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm shadow"
              >
                Reset
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto">
              <ol className="space-y-2">{moves}</ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
