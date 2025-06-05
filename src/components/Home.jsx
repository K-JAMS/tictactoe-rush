import React, { useEffect, useState } from "react";
import { TossCoin } from "./TossCoin";
import { TicTacToeSolo } from "./TicTacToeSolo";
import TTTRLogo from "../assets/images/TTTR.avif";
import Cross from "../assets/images/Cross.avif";
import Circle from "../assets/images/Circle.avif";
import PixelBg from "../assets/images/pixelbg.avif";
import Head from "../assets/images/coins/head.avif";
import Tail from "../assets/images/coins/tail.avif";
import HeadsGif from "../assets/images/coins/Heads.gif";
import TailsGif from "../assets/images/coins/Tails.gif";
import ChicFront from "../assets/images/ChichicFront.gif";
import ChicBack from "../assets/images/ChichicBack.gif";

export const Home = () => {
  const [start, setStart] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [coinResult, setCoinResult] = useState(null);
  const [about, setAbout] = useState(false);

  useEffect(() => {
    const images = [
      TTTRLogo,
      PixelBg,
      Cross,
      Circle,
      Head,
      Tail,
      HeadsGif,
      TailsGif,
      ChicFront,
      ChicBack,
    ];

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleClick = () => {
    setStart(true);
    setShowGame(false);
  };

  const handleCoinFinish = (result) => {
    setCoinResult(result);
    setStart(false);
    setShowGame(true);
  };

  const handleAbout = () => {
    setAbout(true);
  };

  return (
    <section
      className={`w-full min-w-[150px] mx-auto h-screen fixed z-0 bg-cover bg-center`}
      style={{ backgroundImage: `url(${PixelBg})` }}
    >
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
          <div
            className={`fixed w-screen h-screen z-10 transition duration-300 py-25 px-10 ${
              about ? "visible opacity-100" : "invisible opacity-0"
            }`}
          >
            <div className="max-w-[600px] max-h-screen min-h-[300px] px-10 py-10 bg-orange-500 border-15 border-black mx-auto relative">
              <button
                className="absolute top-1 right-2 text-black text-4xl bg-white-600 px-2  hover:text-white transition duration-300 cursor-pointer"
                onClick={() => setAbout(false)}
              >
                &times;
              </button>
              <h1 className="text-6xl text-center text-yellow-400 pb-1 lilita-one-regular text-stroke-black text-shadow-md text-shadow-black">
                About
              </h1>
              <h1 className="text-2xl text-center py-7 lilita-one-regular text-shadow-md text-shadow-black">
                🎮 Game Description
              </h1>
              <p className="text-black text-md  text-center">
                Tic Tac Toe Solo is a fast-paced version of the classic game
                where you play against an AI. The difficulty increases as you
                score more, with timers, bonus time, and smart AI moves keeping
                things challenging and fun.
              </p>
              <h1 className="text-2xl text-center py-7 lilita-one-regular text-shadow-md text-shadow-black">
                ⚠️ Disclaimer
              </h1>
              <p className="text-black text-md text-center">
                This game was built with the help of AI and is made for
                educational purposes to better understand React and its
                libraries.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center pt-30">
            <img
              src={TTTRLogo}
              className=" max-w-[400px] min-w-[100px] mx-auto pointer-events-none"
            />
          </div>
          <div className="block items-center justify-center py-15 mx-auto max-w-[300px]">
            <button
              onClick={handleClick}
              className="my-2 mx-auto text-center w-full transition duration-300 ease hover:scale-110 cursor-pointer lilita-one-regular text-6xl text-white text-stroke-black text-shadow-yellow-500 hover:text-shadow-lg"
            >
              SoloRush
            </button>
            <button
              onClick={handleAbout}
              className="my-2 mx-auto text-center w-full transition duration-300 ease hover:scale-110 cursor-pointer lilita-one-regular text-6xl text-white text-stroke-black text-shadow-yellow-500 hover:text-shadow-lg"
            >
              About
            </button>
          </div>
        </>
      )}
    </section>
  );
};
