'use client';

import { useState } from 'react';
import { calculateWinner, isDraw, getNextPlayer, getGameStats } from '../utils/gameLogic';
import type { GameBoard } from '../types/game';

export default function Home() {
  // Test different game scenarios
  const testScenarios = [
    {
      name: "X Wins - Top Row",
      board: ['X', 'X', 'X', 'O', 'O', null, null, null, null] as GameBoard
    },
    {
      name: "O Wins - Diagonal", 
      board: ['O', 'X', 'X', 'X', 'O', null, null, null, 'O'] as GameBoard
    },
    {
      name: "Draw Game",
      board: ['X', 'O', 'X', 'O', 'O', 'X', 'O', 'X', 'O'] as GameBoard
    },
    {
      name: "Game in Progress",
      board: ['X', 'O', null, 'O', 'X', null, null, null, null] as GameBoard
    }
  ];

  const [currentScenario, setCurrentScenario] = useState(0);
  const currentBoard = testScenarios[currentScenario].board;
  const moveCount = currentBoard.filter(square => square !== null).length;
  
  const winner = calculateWinner(currentBoard);
  const isGameDraw = isDraw(currentBoard);
  const nextPlayer = getNextPlayer(moveCount);
  const stats = getGameStats(currentBoard, moveCount);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🧠 Testing Game Logic
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Test Scenarios */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Test Scenarios</h2>
            
            <div className="space-y-3">
              {testScenarios.map((scenario, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentScenario(index)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    currentScenario === index
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {scenario.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Results</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-1 p-2 bg-gray-200 rounded-lg">
                {currentBoard.map((square, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 flex items-center justify-center bg-white rounded text-lg font-bold ${
                      winner?.line.includes(index) ? 'bg-green-200' : ''
                    } ${
                      square === 'X' ? 'text-blue-600' : 'text-red-600'
                    }`}
                  >
                    {square || '·'}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <p><strong>Winner:</strong> {winner ? winner.winner : 'None'}</p>
                <p><strong>Winning Line:</strong> {winner ? `[${winner.line.join(', ')}]` : 'None'}</p>
                <p><strong>Is Draw:</strong> {isGameDraw ? 'Yes' : 'No'}</p>
                <p><strong>Next Player:</strong> {nextPlayer}</p>
                <p><strong>Total Moves:</strong> {stats.totalMoves}</p>
                <p><strong>Game Over:</strong> {stats.isGameOver ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}