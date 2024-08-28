import { useState } from "react";
import "./App.css";
import Box from "./Component/Box";

function App() {
  const initialBoard = Array(3)
    .fill(null)
    .map(() => Array(3).fill(null)); //#x3 2-d array filled with null
  const [squares, setSquares] = useState(initialBoard); //initially squares = initialBoard means it's a 3X3 array
  const [currentPlayer, setCurrentPlayer] = useState("X"); // for toggeling
  const [winner, setWinner] = useState(null); //initially winner = null
  const [isTie, setisTie] = useState(false); //when no one wins, initially it is false

  const winningCombinations = [
    // Rows
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // Columns
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // Diagonals
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];


  const checkTie = (squares) => {
    //if all the squares are filled and winner is still null then it should be considered as tie
    return squares.flat().every(square => square !== null);
    //flat will convert 2d array to 1d array
  };

  const checkWinner = (squares) => {
    // loop on squaers array to find result use condiions
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        squares[a[0]][a[1]] &&
        squares[a[0]][a[1]] === squares[b[0]][b[1]] &&
        squares[a[0]][a[1]] === squares[c[0]][c[1]]
      ) {
        return squares[a[0]][a[1]];
      }
    }
    return null;
  };

  const handleClick = (row, col) => {

    if (squares[row][col] || winner || isTie) return;

    console.log(row, col);

    //taking with index(x,y) is clicked and updating the square as per condition

    const newSquares = squares.map((arr) => arr.slice());
    newSquares[row][col] = currentPlayer;
    setSquares(newSquares);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    console.log(newSquares);

    //winning logic
    const gameWinner = checkWinner(newSquares);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (checkTie(newSquares)) {
      setisTie(true);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const renderBox = (row, col) => {
    return (
      <Box
        value={squares[row][col]}
        handleClick={() => handleClick(row, col)}
        key={`${row}-${col}`}
      />
      //render box is giving one box, and we are calling renderbox in board-div 9 times 3X3 and passing the row,col value to handleclick so that eitherX or O will be displayed on screen
    );
  };

  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">TicTacToe</h1>
          <div className="Board">
            {squares.map((rowArray, rowIndex) => (
              <div className="flex" key={rowIndex}>
                {rowArray.map((_, colIndex) => renderBox(rowIndex, colIndex))}
              </div>
            ))}
          </div>
          <h1>Player {currentPlayer}</h1>
          <h1>Winner is: {winner}</h1>
          {console.log(`"Winner"` + winner)}
          {winner && (
            <h2 className="text-xl font-bold mt-4">{winner} is the Winner!</h2>
          )}
          {isTie && !winner && <h2 className="text-xl font-bold mt-4">It's a Tie!</h2>}
        </div>
      </div>
    </>
  );
}

export default App;
