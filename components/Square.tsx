interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  isWinningSquare?: boolean;
}

export default function Square({ 
  value, 
  onSquareClick, 
  isWinningSquare = false 
}: SquareProps) {
  return (
    <button 
      className={`w-16 h-16 border-2 border-gray-400 bg-white hover:bg-gray-50 
                  text-2xl font-bold transition-colors duration-200
                  ${isWinningSquare ? 'bg-green-200 hover:bg-green-200' : ''}
                  ${value === 'X' ? 'text-blue-600' : 'text-red-600'}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}