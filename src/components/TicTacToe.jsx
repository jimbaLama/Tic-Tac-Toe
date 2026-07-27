import { useState } from "react";
import "./TicTacToe.css";
import cross from "../assets/cross.png";
import circle from "../assets/circle.png";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [lock, setLock] = useState(false);

  const toggle = (index) => {
    if (lock || board[index] !== "") return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "x" : "o";

    setBoard(newBoard);
    setIsXTurn(!isXTurn);

    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;

      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        alert(`${board[a].toUpperCase()} Wins!`);
        setLock(true);
        return;
      }
    }

    if (!board.includes("")) {
      alert("It's a Draw!");
      setLock(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
    setLock(false);
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic Tac Toe Game in <span>React</span>
      </h1>

      <div className="board">
        {[0, 1, 2].map((row) => (
          <div className="row" key={row}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;

              return (
                <div
                  key={index}
                  className="boxes"
                  onClick={() => toggle(index)}
                >
                  {board[index] === "x" && (
                    <img src={cross} alt="Cross" />
                  )}

                  {board[index] === "o" && (
                    <img src={circle} alt="Circle" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;