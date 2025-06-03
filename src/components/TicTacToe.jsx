import React, { useState } from "react";

export const TicTacToe = ({onExit}) => {
  const Square = ({ value, onClick }) => {
    const getIcon = () => {
      if (value === "x")
        return (
          <img
            src="/img/Cross.png"
            alt="X"
            className="w-full h-full object-contain"
          />
        );
      if (value === "o")
        return (
          <img
            src="/img/Circle.png"
            alt="O"
            className="w-full h-full object-contain"
          />
        );
      return null;
    };

    return (
      <button
        onClick={onClick}
        className="w-20 h-20 border-2 border-black flex items-center justify-center cursor-pointer"
      >
        {getIcon()}
      </button>
    );
  };

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = [...squares];
    nextSquares[i] = isX ? "x" : "o";
    setSquares(nextSquares);
    setIsX(!isX);
  };

  const calculateWinner = (squares) => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player: ${isX ? "x" : "o"}`;
  }
  
  const handlePause = () => {
    setPause(true);
    
  };

  const handleRestart = () => {
    setIsX(true)
    setSquares(Array(9).fill(null))
    setPause(false)
  }

  const handleExit = () =>{
    setIsX(true);
    setSquares(Array(9).fill(null));
    setPause(false);

    onExit?.();
  }

  const [pause, setPause] = useState(false);
  return (
    <section className="fixed bg-[url('/img/pixelbg.png')] bg-cover bg-center w-full h-screen justify-center items-center">
      <div
        className={`${
          pause ? "visible opacity-100" : "invisible opacity-0"
        }  min-h-screen w-full px-20 fixed flex justify-center items-center bg-black/80 transition duration-300 overflow-hidden z-50`}
      >
        <button
          className="absolute top-20 right-2 text-white text-5xl bg-white-600 px-2  hover:text-gray-400 transition duration-300 cursor-pointer"
          onClick={() => setPause(false)}
        >
          &times;
        </button>
        <div>
          <button
            onClick={handleRestart}
            className="block mx-auto w-40 p-2 my-5 bg-white border-2 border-black cursor-pointer"
          >
            Restart
          </button>
          <button onClick={handleExit} className="block mx-auto w-40 p-2 my-5 bg-white border-2 border-black cursor-pointer">
            Exit Game
          </button>
        </div>
      </div>
      <div className="w-full mx-auto px-4">
        <div className="flex justify-between items-center py-10">
          <img
            src="img/TTTR.png"
            className=" max-w-[300px] min-w-[100px] mx-auto"
          />
          <button
            onClick={() => setPause(true)}
            className={`text-3xl cursor-pointer transition duration-300 ${
              pause ? "invisible opacity-0" : "visible opacity-100"
            }`}
          >
            <i className="flex fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="block mx-auto">
          <div className="border-10 border-gray-500 bg-gray-900">
            <div className="flex">
              <Square value={squares[0]} onClick={() => handleClick(0)} />
              <Square value={squares[1]} onClick={() => handleClick(1)} />
              <Square value={squares[2]} onClick={() => handleClick(2)} />
            </div>
            <div className="flex">
              <Square value={squares[3]} onClick={() => handleClick(3)} />
              <Square value={squares[4]} onClick={() => handleClick(4)} />
              <Square value={squares[5]} onClick={() => handleClick(5)} />
            </div>
            <div className="flex">
              <Square value={squares[6]} onClick={() => handleClick(6)} />
              <Square value={squares[7]} onClick={() => handleClick(7)} />
              <Square value={squares[8]} onClick={() => handleClick(8)} />
            </div>
          </div>
          <div>{status}</div>
        </div>
      </div>
    </section>
  );
};
