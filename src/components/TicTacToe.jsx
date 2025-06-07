import React, { useEffect, useState } from "react";
import TTTRLogo from "../assets/images/TTTR.avif";
import crossImg from "../assets/images/Cross.avif";
import circleImg from "../assets/images/Circle.avif";

export const TicTacToe = ({ onExit, playClickSound, isMuted, setIsMuted, playWinSound }) => {
  const [playerOne, setPlayerOne] = useState(0);
  const [playerTwo, setPlayerTwo] = useState(0);
  const [winnerCounted, setWinnerCounted] = useState(false);
  const [disableClick, setDisableClick] = useState(false);

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
    if (calculateWinner(squares) || squares[i] || disableClick) {
      return;
    }

    if (!isMuted && playClickSound) {
      playClickSound();
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
  const isDraw = !winner && squares.every((square) => square !== null);
  useEffect(() => {
    if (winner || isDraw) {
      setDisableClick(true);

      if (!winnerCounted) {
        if (winner) {
          if (winner === "x") setPlayerOne((prev) => prev + 1);
          else setPlayerTwo((prev) => prev + 1);

          if (!isMuted && playWinSound) {
            playWinSound();
          }
        }

        setWinnerCounted(true);

        setTimeout(() => {
          setSquares(Array(9).fill(null));
          setIsX(true);
          setDisableClick(false);
          setWinnerCounted(false);
        }, 1500);
      }
    }
  }, [winner, isDraw, winnerCounted]);

  let status;
  if (winner) {
    status = (
      <div>
        Winner:{" "}
        <img
          src={winner === "x" ? crossImg : circleImg}
          alt={winner}
          className="inline-block w-6 h-6"
        />
      </div>
    );
  } else if (isDraw) {
    status = <div>Draw!</div>;
  } else {
    status = (
      <div>
        {isX ? "Player 1" : "Player 2"}'s Turn:{" "}
        <img
          src={isX ? crossImg : circleImg}
          alt={isX ? "x" : "o"}
          className="inline-block w-6 h-6"
        />
      </div>
    );
  }

  const handlePause = () => {
    setPause(true);
  };

  const handleRestart = () => {
    playClickSound();
    setIsX(true);
    setSquares(Array(9).fill(null));
    setPause(false);
    setPlayerOne(0);
    setPlayerTwo(0);
  };

  const handleExit = () => {
    playClickSound();
    setSquares(Array(9).fill(null));
    setPause(false);
    setPlayerOne(0);
    setPlayerTwo(0);
    onExit?.();
  };

  const [pause, setPause] = useState(false);
  return (
    <section className="fixed w-full h-screen justify-center items-center">
      <div
        className={`${
          pause ? "visible opacity-100" : "invisible opacity-0"
        }  min-h-screen w-full fixed flex justify-center items-center bg-black/80 transition duration-100 overflow-hidden z-50`}
      >
        <div>
          <h2 className="text-center text-7xl text-yellow-600 lilita-one-regular text-stroke-white block mx-aut">
            Paused
          </h2>
          <button
            onClick={() => {
              setPause(false);
              playClickSound();
            }}
            className="text-4xl text-white lilita-one-regular block mx-auto transition duration-300 ease hover:-translate-y-1 hover:scale-110 my-5 text-shadow-yellow-600 hover:text-shadow-md cursor-pointer active:scale-80"
          >
            Resume
          </button>
          <button
            onClick={handleRestart}
            className="text-4xl text-white lilita-one-regular block mx-auto transition duration-300 ease hover:-translate-y-1 hover:scale-110 my-5 text-shadow-yellow-600 hover:text-shadow-md cursor-pointer active:scale-80"
          >
            Restart
          </button>
          <button
            onClick={handleExit}
            className="text-4xl text-white lilita-one-regular block mx-auto transition duration-300 ease hover:-translate-y-1 hover:scale-110 my-5 text-shadow-yellow-600 hover:text-shadow-md cursor-pointer active:scale-80"
          >
            Exit Game
          </button>
          <button
            onClick={() => {
              playClickSound();
              setIsMuted(!isMuted);
              playClickSound = { playClickSound };
              isMuted = { isMuted };
            }}
            className="text-4xl text-white lilita-one-regular block mx-auto transition duration-300 ease hover:text-gray-300 cursor-pointer active:scale-80"
          >
            {isMuted ? (
              <i class="fa-solid fa-volume-xmark"></i>
            ) : (
              <i class="fa-solid fa-volume-high"></i>
            )}
          </button>
        </div>
      </div>
      <div className="w-full ">
        <div className="mx-auto px-4">
          <div className="flex justify-between items-center py-10">
            <img
              src={TTTRLogo}
              className=" max-w-[300px] min-w-[100px] mx-auto pointer-events-none"
            />
            <button
              onClick={() => {
                setPause(true);
                playClickSound();
              }}
              className={`text-3xl cursor-pointer transition duration-300 active:scale-80 ${
                pause ? "invisible opacity-0" : "visible opacity-100"
              }`}
            >
              <i className="flex fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
        <div className="flex w-full mx-auto justify-center items-cente">
          <h1 className="text-2xl text-red-500 mx-6 lilita-one-regular text-shadow-lg text-shadow-white">
            Player1: {playerOne}
          </h1>
          <h1 className="text-2xl text-blue-400 mx-6 lilita-one-regular text-shadow-lg text-shadow-white">
            Player2: {playerTwo}
          </h1>
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
            <div className="max-w-[300px] text-center lilita-one-regular text-yellow-500 text-3xl text-stroke-white">
              {status}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
