'use client';

import Square from '../components/Square';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8">Testing Square Component</h1>
        <div className="flex space-x-2">
          <Square value="X" onSquareClick={() => alert('X clicked!')} />
          <Square value="O" onSquareClick={() => alert('O clicked!')} />
          <Square value={null} onSquareClick={() => alert('Empty clicked!')} />
          <Square value="X" onSquareClick={() => alert('Winner!')} isWinningSquare={true} />
        </div>
      </div>
    </main>
  );
}