import React, { useState } from "react";
import { TossCoin } from "./TossCoin";
import { TicTacToeSolo } from "./TicTacToeSolo";

export const Home = () => {
  const [start, setStart] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [coinResult, setCoinResult] = useState(null);

  const handleClick = () => {
    setStart(true);
    setShowGame(false);
  };

  const handleCoinFinish = (result) => {
    setCoinResult(result);
    setStart(false);
    setShowGame(true);
  };

  return (
    <section className="w-full min-w-[150px] mx-auto h-screen fixed z-0 bg-[url('/img/pixelbg.png')] bg-cover bg-center">
      {start && <TossCoin onFinish={handleCoinFinish} />}

      {showGame && (
        <TicTacToeSolo
          result={coinResult}
          onExit={() => {
            setShowGame(false);
            setCoinResult(null);
            setStart(false);
          }}
          onRestart={() => {
            setShowGame(false);
            setCoinResult(null);
            setStart(true);
            {
              start && <TossCoin onFinish={handleCoinFinish} />;
            }
          }}
        />
      )}

      {!start && !showGame && (
        <>
          <div className="flex items-center justify-center py-20">
            <img
              src="img/TTTR.png"
              className=" max-w-[400px] min-w-[100px] mx-auto flipping"
            />
          </div>
          <div className="flex items-center justify-center py-20">
            <button
              onClick={handleClick}
              className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer"
            >
              <img
                src="img/SoloRush.png"
                className=" max-w-[400px] min-w-[80px] mx-auto pointer-events-none"
              />
            </button>
          </div>
        </>
      )}
    </section>
  );
};
