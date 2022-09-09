import React, { useState } from "react";
import PropTypes from "prop-types";

Board.propTypes = {
  squares: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

type BoardProps = PropTypes.InferProps<typeof Board.propTypes>;
type SquareProps = PropTypes.InferProps<typeof Square.propTypes>;

type boardProps = {
  squares: string[];
  onClick: (i: number) => void;
};
type squareProps = {
  value: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

type squaresType = {
  squares: string[];
};

type gameState = {
  history: squaresType[];
  xIsNext: boolean;
};

export default function TicTacToe() {
  const [gameHistory, setGameHistory] = useState<gameState>({
    history: [{ squares: new Array(9).fill(null) }],
    xIsNext: true,
  });
  const handleClick = (i: number): void => {
    console.log(i);
    const history = gameHistory.history;
    const current = history[history.length - 1];
    const squares = [...current.squares];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = gameHistory.xIsNext ? "X" : "O";
    setGameHistory({
      history: history.concat([{ squares }]),
      xIsNext: !gameHistory.xIsNext,
    });
  };

  const history = gameHistory.history;
  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);
  let status: string;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (gameHistory.xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info"></div>
      <div>{status}</div>
    </div>
  );
}

function Board(props: BoardProps) {
  const renderSquare = (i: number) => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Square(props: SquareProps) {
  return (
    <>
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    </>
  );
}

function calculateWinner(squares: string[]): string | null {
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
  }
  return null;
}
