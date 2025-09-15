'use client';

import { useState } from 'react';
import Board from '../components/Board';
import { getNextPlayer } from '../utils/gameLogic';
import type { GameBoard } from '../types/game';

export default function Home() {
  const [squares, setSquares] = useState<GameBoard>(Array(9).fill(null));
  const [moveCount, setMoveCount] = useState(0);
  
  const currentPlayer = getNextPlayer(moveCount);
  
  const handleSquareClick = (index: number) => {
    // Create new squares array with the move
    const newSquares = [...squares];
    newSquares[index] = currentPlayer;
    setSquares(newSquares);
    setMoveCount(moveCount + 1);
  };
  
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setMoveCount(0);
  };

  const loadTestScenario = (scenario: GameBoard) => {
    setSquares(scenario);
    setMoveCount(scenario.filter(s => s !== null).length);
  };

  // Preset game scenarios for testing
  const testScenarios = [
    {
      name: "Empty Board",
      board: Array(9).fill(null) as GameBoard
    },
    {
      name: "Almost Win - X",
      board: ['X', 'X', null, 'O', 'O', null, null, null, null] as GameBoard
    },
    {
      name: "Almost Win - O",
      board: ['O', null, 'X', null, 'O', 'X', null, null, null] as GameBoard
    },
    {
      name: "Almost Draw",
      board: ['X', 'O', 'X', 'O', 'X', null, 'O', 'X', 'O'] as GameBoard
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🎲 Testing Board Component
          </h1>
          <p className="text-xl text-gray-600">Play a game or load test scenarios</p>
        </header>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Game Board */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <Board
                squares={squares}
                onSquareClick={handleSquareClick}
                currentPlayer={currentPlayer}
              />
            </div>
          </div>
          
          {/* Controls & Info */}
          <div className="space-y-6">
            {/* Game Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Game Controls</h2>
              
              <button
                onClick={resetGame}
                className="w-full mb-4 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                🔄 Reset Game
              </button>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Load Test Scenarios:</p>
                {testScenarios.map((scenario, index) => (
                  <button
                    key={index}
                    onClick={() => loadTestScenario(scenario.board)}
                    className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                  >
                    {scenario.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Game Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Game Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Player:</span>
                  <span className={`font-bold ${currentPlayer === 'X' ? 'text-blue-600' : 'text-red-600'}`}>
                    {currentPlayer}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Moves Made:</span>
                  <span className="font-bold text-green-600">{moveCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Empty Squares:</span>
                  <span className="font-bold text-purple-600">{9 - moveCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}