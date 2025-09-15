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
      <li key={move} className="mb-2">
        <button
          onClick={() => jumpToMove(move)}
          className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                     ${isCurrentMove 
                       ? 'bg-blue-500 text-white shadow-md ring-2 ring-blue-300' 
                       : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-sm'}`}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🎮 Tic-Tac-Toe
          </h1>
          <p className="text-xl text-gray-600">Master the classic game with time travel!</p>
        </header>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <Board
                squares={currentSquares}
                onSquareClick={handleSquareClick}
                currentPlayer={currentPlayer}
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">History</h2>
                <button
                  onClick={resetGame}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                >
                  Reset
                </button>
              </div>
              
              <div className="max-h-60 overflow-y-auto">
                <ol className="space-y-1">{moves}</ol>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Move:</span>
                  <span className="font-bold text-blue-600">{gameState.currentMove}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Moves:</span>
                  <span className="font-bold text-green-600">{gameState.history.length - 1}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}