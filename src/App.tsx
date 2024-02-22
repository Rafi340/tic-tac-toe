import { useState } from "react";

function Square({ value, onSqureClick }) {
  return (
    <button
      onClick={onSqureClick}
      className="bg-white border border-gray-400 h-12 w-12 m-1 leading-9 text-lg"
    >
      {value}
    </button>
  );
}
function CalculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }

    return null;
  }
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsnext, setXIsNext] = useState(true);

  const winner = CalculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = "Next player " + (xIsnext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || CalculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsnext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setXIsNext(!xIsnext);
    setSquares(nextSquares);
  }

  return (
    <>
      <div>{status}</div>
      <div className="flex">
        <Square value={squares[0]} onSqureClick={() => handleClick(0)} />
        <Square value={squares[1]} onSqureClick={() => handleClick(1)} />
        <Square value={squares[2]} onSqureClick={() => handleClick(2)} />
      </div>

      <div className="flex">
        <Square value={squares[3]} onSqureClick={() => handleClick(3)} />
        <Square value={squares[4]} onSqureClick={() => handleClick(4)} />
        <Square value={squares[5]} onSqureClick={() => handleClick(5)} />
      </div>

      <div className="flex">
        <Square value={squares[6]} onSqureClick={() => handleClick(6)} />
        <Square value={squares[7]} onSqureClick={() => handleClick(7)} />
        <Square value={squares[8]} onSqureClick={() => handleClick(8)} />
      </div>
      <button
        onClick={() => {
          setSquares(Array(9).fill(null));
          setXIsNext(true);
        }}
      >
        Reset Game
      </button>
    </>
  );
}
