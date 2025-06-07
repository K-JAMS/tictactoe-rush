import React, { useEffect, useRef, useState } from "react";
import TTTRLogo from "../assets/images/TTTR.avif";
import crossImg from "../assets/images/Cross.avif";
import circleImg from "../assets/images/Circle.avif";
import ChicFront from "../assets/images/ChichicFront.gif";
import ChicBack from "../assets/images/ChichicBack.gif";
import comboSound from "../assets/audio/combo.mp3";

export const TicTacToeSolo = ({
  result,
  onExit,
  onRestart,
  playClickSound,
  isMuted,
  setIsMuted,
  playWinSound,
  playLoseSound,
}) => {
  const [currentResult, setCurrentResult] = useState(result);
  const playerSymbol = parseInt(currentResult) === 1 ? "x" : "o";
  const aiSymbol = playerSymbol === "x" ? "o" : "x";
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(playerSymbol === "x");
  const [pause, setPause] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [count, setCount] = useState(10);
  const [countdown, setCountdown] = useState(count);
  const [baseTimeLeft, setBaseTimeLeft] = useState(60);
  const [timeLeft, setTimeLeft] = useState(baseTimeLeft);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [bonusTime, setBonusTime] = useState(false);
  const [aiAtk, setAiAtk] = useState(false);
  const [combo, setCombo] = useState(0);
  const comboAudioRef = useRef(null);

  const playComboSound = () => {
    if (!isMuted && comboAudioRef.current) {
      const sound = comboAudioRef.current.cloneNode();
      sound.volume = 0.5;
      sound.play();
    }
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

    if (!isMuted && playClickSound) {
      playClickSound();
    }
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
        setCombo(0);
        setIsPlayerTurn(false);
        setCountdown(count);
      }
    }
  }, [countdown, pause, isPlayerTurn, resetKey]);

  useEffect(() => {
    if (winner || isDraw) {
      if (winner === playerSymbol) {
        setScore((prev) => prev + 100 + combo * 5);
        setTimeLeft((prev) => prev + 10 + combo * 5);
        setBonusTime(true);
        setCombo((prev) => prev + 1);
        if (combo === 0){
          playWinSound();
        }
      } else {
        setCombo(0);
        if (winner === aiSymbol) {
          setTimeLeft((prev) => prev - level * 5);
          setAiAtk(true);
          playLoseSound();
        }
      }

      const timeout = setTimeout(() => {
        setPause(false);
        setSquares(Array(9).fill(null));

        setCurrentResult((prev) => (parseInt(prev) === 1 ? 2 : 1));
        setIsPlayerTurn((prev) => !(parseInt(currentResult) === 1));
        setCountdown(count);
        setResetKey((prev) => prev + 1);
        setBonusTime(false);
        setAiAtk(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [winner, isDraw]);

  useEffect(() => {
    if (pause) return;

    if (timeLeft <= 0) {
      setPause(true);
      return;
    }

    const timeLefttimer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeLefttimer);
  }, [timeLeft, pause]);

  useEffect(() => {
    if (score > 2000) {
      setLevel(4);
    } else if (score > 1500) {
      setLevel(3);
    } else if (score > 1000) {
      setLevel(2);
    } else if (score > 550) {
      setLevel(1);
    } else {
      setLevel(0);
    }
  }, [score]);

  useEffect(() => {
    setCount(10 - level * 2);
  }, [level]);

  useEffect(() => {
    if (combo >= 2) {
      playComboSound();
    }
  }, [combo]);

  const makeAIMove = () => {
    if (winner || isPlayerTurn || pause) return;

    if (level >= 3) {
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
    }

    const newSquares = [...squares];

    if (level >= 3 && !newSquares[4]) {
      newSquares[4] = aiSymbol;
      setSquares(newSquares);
      setIsPlayerTurn(true);
      return;
    }
    if (level < 3) {
      const aiMovesCount = newSquares.filter((s) => s === aiSymbol).length;

      if (aiMovesCount === 0) {
        const sideSquares = [1, 3, 5, 7];
        const available = sideSquares.filter((index) => !newSquares[index]);

        if (available.length > 0) {
          const randomIndex =
            available[Math.floor(Math.random() * available.length)];
          newSquares[randomIndex] = aiSymbol;
          setSquares(newSquares);
          setIsPlayerTurn(true);
          return;
        }
      }
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

    if (level >= 1) {
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
    }

    const emptyIndices = newSquares
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (emptyIndices.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyIndices.length);
      const moveIndex = emptyIndices[randomIndex];
      newSquares[moveIndex] = aiSymbol;
    }

    setSquares(newSquares);
    setIsPlayerTurn(true);
  };

  let status;
  let currentScore;
  if (winner) {
    status = `Winner: ${winner === playerSymbol ? "Player" : "Chic Chic"}`;
    currentScore = `${winner === playerSymbol ? score + 100 : score - 100}`;
  } else if (isDraw) {
    status = "Draw!";
  } else {
    status = `${isPlayerTurn ? "Player's" : "Chic Chic's"} Turn`;
  }

  const handlePause = () => {
    playClickSound();
    setPause(true);
  };

  const handleRestart = () => {
    playClickSound();
    setCombo(0);
    setSquares(Array(9).fill(null));
    setPause(false);
    setIsPlayerTurn(playerSymbol === "x");
    onRestart?.();
  };

  const handleExit = () => {
    playClickSound();
    setCombo(0);
    setSquares(Array(9).fill(null));
    setPause(false);
    setIsPlayerTurn(playerSymbol === "x");
    onExit?.();
  };

  return (
    <section className="fixed w-full h-screen justify-center items-center">
      <audio ref={comboAudioRef} src={comboSound} preload="auto" />
      <div
        className={`fixed w-screen h-screen bg-black z-10 transition duration-50 ${
          combo >= 2 ? "visible opacity-75" : "invisible opacity-0"
        }`}
      ></div>
      <div
        className={`${
          pause ? "visible opacity-100" : "invisible opacity-0"
        }  min-h-screen w-full px-20 fixed flex justify-center items-center bg-black/80 transition duration-50 overflow-hidden z-50`}
      >
        <div>
          <h1
            className={`text-5xl text-center lilita-one-regular block mx-auto cursor-default text-stroke-white ${
              timeLeft <= 0 ? "text-red-600" : "text-yellow-500"
            }`}
          >
            {timeLeft <= 0 ? "Game Over" : "Paused"}
          </h1>

          {timeLeft > 0 && (
            <button
              onClick={() => {
                setPause(false);
                playClickSound();
              }}
              className="text-4xl text-white lilita-one-regular block mx-auto transition duration-50 ease hover:-translate-y-1 hover:scale-110 my-5 text-shadow-yellow-600 hover:text-shadow-md cursor-pointer active:scale-80"
            >
              Resume
            </button>
          )}
          {timeLeft <= 0 && (
            <h1 className="text-4xl text-yellow-600 text-center lilita-one-regular block mx-auto text-stroke-white">
              You got {score}pts!
            </h1>
          )}

          <button
            onClick={handleRestart}
            className="text-4xl text-white lilita-one-regular block mx-auto transition duration-50 ease hover:-translate-y-1 hover:scale-110 my-5 text-shadow-yellow-600 hover:text-shadow-md cursor-pointer active:scale-80"
          >
            Restart
          </button>
          <button
            onClick={handleExit}
            className="text-4xl text-white lilita-one-regular block mx-auto transition duration-50 ease hover:-translate-y-1 hover:scale-110 my-5 text-shadow-yellow-600 hover:text-shadow-md cursor-pointer active:scale-80"
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
            className="text-4xl text-white lilita-one-regular block mx-auto transition duration-50 ease hover:text-gray-300 cursor-pointer active:scale-80"
          >
            {isMuted ? (
              <i class="fa-solid fa-volume-xmark"></i>
            ) : (
              <i class="fa-solid fa-volume-high"></i>
            )}
          </button>
        </div>
      </div>
      <div className="w-full mx-auto px-4">
        <div className="flex justify-between items-center py-0">
          <img
            src={TTTRLogo}
            className="max-w-[300px] min-w-[100px] mx-auto pointer-events-none z-30"
          />
          <button
            onClick={handlePause}
            className={`text-3xl cursor-pointer transition duration-50 z-30 active:scale-80 ${
              pause ? "invisible opacity-0" : "visible opacity-100"
            }`}
          >
            <i className="flex fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="block mx-auto z-20">
          <div
            className={`${
              timeLeft <= 10 ? "text-red-500" : "text-white"
            } text-3xl max-w-[260px] mx-auto lilita-one-regular text-shadow-lg/30`}
          >
            {timeLeft}
            <span className="text-xl">secs left</span>
            {bonusTime && (
              <span className="show-fade text-yellow-400">
                + {10 + (combo - 1) * 5}
              </span>
            )}
            {aiAtk && (
              <span className="show-fade text-red-500"> -{level * 5}</span>
            )}
          </div>
          <div className="text-3xl text-yellow-400 text-stroke-black max-w-[260px] mx-auto lilita-one-regular text-shadow-lg/30">
            Score: {score}
          </div>
          <div className="float-right -mt-20">
            <img
              className="h-[80px] pointer-events-none"
              src={aiAtk ? ChicBack : ChicFront}
            />
          </div>
          <div
            className={`border-10 border-gray-500 bg-gray-900 max-w-[260px] mx-auto ${
              combo >= 2 ? "glow" : ""
            }`}
          >
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
          <div className="mx-auto max-w-[300px] relative mt-2">
            {combo >= 2 && (
              <h1 className="show-fade text-blue-400 text-shadow-lg text-shadow-yellow-500 text-center lilita-one-regular text-stroke-white text-3xl absolute w-full -mt-2">
                Combo {combo - 1}
              </h1>
            )}
            {countdown > 0 && (
              <div className="max-w-[300px] h-5 bg-gray-700 rounded-full mx-auto my-1 overflow-hidden border border-white">
                <div
                  className={`h-full ${
                    combo >= 2
                      ? "bg-gradient-to-r from-white to-blue-400"
                      : "bg-gradient-to-r from-red-500 to-yellow-400"
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
            <div className="max-w-[300px] text-center lilita-one-regular text-yellow-500 text-3xl text-stroke-white">
              {status}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
