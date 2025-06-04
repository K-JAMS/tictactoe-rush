import React, { useEffect, useState } from "react";

import crossImg from "../assets/images/Cross.avif";
import circleImg from "../assets/images/Circle.avif";

export const TicTacToeSolo = ({ result, onExit, onRestart }) => {
  const [currentResult, setCurrentResult] = useState (result);
  const playerSymbol = parseInt(currentResult) === 1 ? "x" : "o";
  const aiSymbol = playerSymbol === "x" ? "o" : "x";
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(playerSymbol === "x");
  const [pause, setPause] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const count = 8;
  const [countdown, setCountdown] = useState(count);



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
  const isDraw = !squares.includes(null) && !winner;

  const Square = ({ value, onClick }) => {
    const getIcon = () => {
      if (value === "x")
        return (
          <img
            src={crossImg}
            alt="X"
            className="w-full h-full object-contain"
          />
        );
      if (value === "o")
        return (
          <img
            src={circleImg}
            alt="O"
            className="w-full h-full object-contain"
          />
        );
      return null;
    };

    return (
      <button
        disabled={!isPlayerTurn || value || winner || pause}
        onClick={onClick}
        className="w-20 h-20 border-2 border-black flex items-center justify-center cursor-pointer"
      >
        {getIcon()}
      </button>
    );
  };

  const handleClick = (i) => {
    if (!isPlayerTurn || squares[i] || pause) return;

    const nextSquares = [...squares];
    nextSquares[i] = playerSymbol;
    setSquares(nextSquares);
    setIsPlayerTurn(false);
    setCountdown(count);
  };

  useEffect(() => {
    if (!isPlayerTurn && !winner && !pause) {
      const timeout = setTimeout(makeAIMove, 500);
      return () => clearTimeout(timeout);
    }
  }, [squares, isPlayerTurn, winner, pause]);

  useEffect(() => {
    if (!pause && isPlayerTurn) {
      if (countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {

        setIsPlayerTurn(false);
        setCountdown(count );
      }
    }
  }, [countdown, pause, isPlayerTurn, resetKey]);

  useEffect(() => {
    if (winner || isDraw) {
      const timeout = setTimeout(() => {
        setPause(false);
        setSquares(Array(9).fill(null));
        
        setCurrentResult((prev) => (parseInt(prev) === 1 ? 2 : 1));
        setIsPlayerTurn((prev) => !(parseInt(currentResult) === 1));
        setCountdown(count);
        setResetKey((prev) => prev + 1);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  });

  const makeAIMove = () => {
    if (winner || isPlayerTurn || pause) return;

    const isFirstAIMove = squares.filter((val) => val !== null).length === 1;
    if (isFirstAIMove && squares[4] === playerSymbol) {
      const emptyIndices = squares
        .map((val, idx) => (val === null ? idx : null))
        .filter((val) => val !== null);

      if (emptyIndices.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyIndices.length);
        const moveIndex = emptyIndices[randomIndex];
        const newSquares = [...squares];
        newSquares[moveIndex] = aiSymbol;
        setSquares(newSquares);
        setIsPlayerTurn(true);
        setCountdown(count);
        return;
      }
    }

    const newSquares = [...squares];

    if (!newSquares[4]) {
      newSquares[4] = aiSymbol;
      setSquares(newSquares);
      setIsPlayerTurn(true);
      return;
    }

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

    for (let [a, b, c] of lines) {
      if (
        newSquares[a] === aiSymbol &&
        newSquares[c] === aiSymbol &&
        !newSquares[b]
      ) {
        newSquares[b] = aiSymbol;
        setSquares(newSquares);
        setIsPlayerTurn(true);
        return;
      }
      if (
        newSquares[a] === aiSymbol &&
        newSquares[b] === aiSymbol &&
        !newSquares[c]
      ) {
        newSquares[c] = aiSymbol;
        setSquares(newSquares);
        setIsPlayerTurn(true);
        return;
      }
      if (
        newSquares[c] === aiSymbol &&
        newSquares[b] === aiSymbol &&
        !newSquares[a]
      ) {
        newSquares[a] = aiSymbol;
        setSquares(newSquares);
        setIsPlayerTurn(true);
        return;
      }
    }

    for (let [a, b, c] of lines) {
      if (
        newSquares[a] === playerSymbol &&
        newSquares[b] === playerSymbol &&
        !newSquares[c]
      ) {
        newSquares[c] = aiSymbol;
        setSquares(newSquares);
        setIsPlayerTurn(true);
        return;
      }
      if (
        newSquares[a] === playerSymbol &&
        newSquares[c] === playerSymbol &&
        !newSquares[b]
      ) {
        newSquares[b] = aiSymbol;
        setSquares(newSquares);
        setIsPlayerTurn(true);
        return;
      }
      if (
        newSquares[b] === playerSymbol &&
        newSquares[c] === playerSymbol &&
        !newSquares[a]
      ) {
        newSquares[a] = aiSymbol;
        setSquares(newSquares);
        setIsPlayerTurn(true);
        return;
      }
    }

    const empty = newSquares.findIndex((val) => val === null);
    if (empty !== -1) {
      newSquares[empty] = aiSymbol;
    }

    setSquares(newSquares);
    setIsPlayerTurn(true);
  };

  let status;
  if (winner) {
    status = `Winner: ${winner === playerSymbol ? "Player" : "Computer"}`;
  } else if (isDraw) {
    status = "Draw!";
  } else {
    status = `Turn: ${isPlayerTurn ? "Player" : "Computer"}`;
  }

  const handlePause = () => {
    setPause(true);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setPause(false);
    setIsPlayerTurn(playerSymbol === "x");
    onRestart?.();
  };

  const handleExit = () => {
    setSquares(Array(9).fill(null));
    setPause(false);
    setIsPlayerTurn(playerSymbol === "x");
    onExit?.();
  };

  return (
    <section className="fixed w-full h-screen justify-center items-center">
      <div
        className={`${
          pause ? "visible opacity-100" : "invisible opacity-0"
        }  min-h-screen w-full px-20 fixed flex justify-center items-center bg-black/80 transition duration-300 overflow-hidden z-50`}
      >
        <div>
          <h1 className="text-6xl text-yellow-500 lilita-one-regular block mx-auto cursor-default text-stroke-white">
            Paused
          </h1>
          <button
            onClick={() => setPause(false)}
            className="text-4xl text-white  lilita-one-regular block mx-auto transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 my-5 cursor-pointer"
          >
            Resume
          </button>
          <button
            onClick={handleRestart}
            className="text-4xl text-white  lilita-one-regular block mx-auto transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 my-5 cursor-pointer"
          >
            Restart
          </button>
          <button
            onClick={handleExit}
            className="text-4xl text-white  lilita-one-regular block mx-auto transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 my-5 cursor-pointer"
          >
            Exit Game
          </button>
        </div>
      </div>
      <div className="w-full mx-auto px-4">
        <div className="flex justify-between items-center py-10">
          <img
            src="https://raw.githubusercontent.com/janrelsaves/tttr-imgs/refs/heads/main/assets/images/TTTR.avif"
            className=" max-w-[300px] min-w-[100px] mx-auto pointer-events-none"
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
          <div className="border-10 border-gray-500 bg-gray-900 max-w-[260px] mx-auto">
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
          <div className="mx-auto text-center lilita-one-regular text-yellow-500 text-5xl text-stroke-white">
            {countdown > 0 && (
              <div className="w-[200px] h-6 bg-gray-700 rounded-full mx-auto mb-6 overflow-hidden border border-white">
                <div
                  className={`h-full ${
                    countdown / count > 0.65
                      ? "bg-yellow-400"
                      : countdown / 5 > 0.35
                      ? "bg-orange-500"
                      : "bg-red-500"
                  } ${
                    isPlayerTurn
                      ? "transition-all duration-1000 ease-linear"
                      : ""
                  } `}
                  style={{
                    width: `${(countdown / count) * 100}%`,
                  }}
                ></div>
              </div>
            )}
            {status}
          </div>
        </div>
      </div>
    </section>
  );
};
