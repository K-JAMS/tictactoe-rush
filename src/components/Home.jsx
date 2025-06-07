import React, { useEffect, useRef, useState } from "react";
import { TossCoin } from "./TossCoin";
import { TicTacToe } from "./TicTacToe";
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
import { About } from "./About";
import { HowToPlay } from "./HowToPlay";
import clickSound from "../assets/audio/click.mp3";
import winSound from "../assets/audio/win.mp3";
import loseSound from "../assets/audio/lose.mp3";

export const Home = ({ isMuted, setIsMuted }) => {
  const [start, setStart] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [coinResult, setCoinResult] = useState(null);
  const [twoPlayer, setTwoPlayer] = useState(false);
  const [about, setAbout] = useState(false);
  const [htp, setHtp] = useState(false);
  const clickAudioRef = useRef(null);
  const winAudioRef = useRef(null);
  const loseAudioRef = useRef(null);
  const [chiClick, setChiClick] = useState(false);

  const playClickSound = () => {
    if (!isMuted && clickAudioRef.current) {
      const sound = clickAudioRef.current.cloneNode();
      sound.play();
    }
  };

  const playWinSound = () => {
    if (!isMuted && winAudioRef.current) {
      const sound = winAudioRef.current.cloneNode();
      sound.play();
    }
  };

  const playLoseSound = () => {
    if (!isMuted && loseAudioRef.current) {
      const sound = loseAudioRef.current.cloneNode();
      sound.volume = 0.5;
      sound.play();
    }
  };

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

  const handleTwoPlayer = () => {
    setTwoPlayer(true);
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

  const handleHTP = () => {
    setHtp(true);
  };

  const handleChiClick = () => {
    setChiClick(true);
    playLoseSound();
    setTimeout(() => {
      setChiClick(false);
    }, 500);
  };

  return (
    <section className={`w-full min-w-[150px] mx-auto h-screen fixed z-0`}>
      <audio ref={clickAudioRef} src={clickSound} preload="auto" />
      <audio ref={winAudioRef} src={winSound} preload="auto" />
      <audio ref={loseAudioRef} src={loseSound} preload="auto" />
      <div>
        {start && (
          <TossCoin
            onFinish={handleCoinFinish}
            playClickSound={playClickSound}
            playWinSound={playWinSound}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
          />
        )}

        {showGame && (
          <TicTacToeSolo
            playClickSound={playClickSound}
            playWinSound={playWinSound}
            playLoseSound={playLoseSound}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
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
                start && (
                  <TossCoin onFinish={handleCoinFinish} isMuted={isMuted} />
                );
              }
            }}
          />
        )}
        {twoPlayer && (
          <TicTacToe
            playClickSound={playClickSound}
            playWinSound={playWinSound}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
            onExit={() => {
              setTwoPlayer(false);
            }}
          />
        )}

        {!start && !showGame && !twoPlayer && (
          <>
            <button
              onClick={() => {
                playClickSound();
                setIsMuted(!isMuted);
                playClickSound = { playClickSound };
                isMuted = { isMuted };
              }}
              className="absolute top-5 right-7 text-white text-4xl md:text-5xl px-2 text-stroke-black hover:text-gray-400 transition duration-50 cursor-pointer active:scale-80"
            >
              {isMuted ? (
                <i class="fa-solid fa-volume-xmark"></i>
              ) : (
                <i class="fa-solid fa-volume-high"></i>
              )}
            </button>
            <div
              className={`fixed w-screen h-screen z-50 transition duration-300 px-5 ${
                about ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <About
                setAbout={setAbout}
                playClickSound={playClickSound}
                isMuted={isMuted}
              />
            </div>
            <div
              className={`fixed w-screen h-screen z-50 transition duration-300 px-5 ${
                htp ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <HowToPlay
                setHtp={setHtp}
                playClickSound={playClickSound}
                isMuted={isMuted}
              />
            </div>
            <div className="flex items-center justify-center z-30 pt-10">
              <img
                src={TTTRLogo}
                className=" max-w-[400px] min-w-[100px] pointer-events-none"
              />
            </div>
            <div className="block items-center justify-center mx-auto max-w-[300px] z-40">
              <div
                onClick={handleChiClick}
                className={` ${
                  chiClick ? "pointer-events-none" : " cursor-pointer"
                }`}
              >
                <img
                  src={chiClick ? ChicBack : ChicFront}
                  alt="Chic Character"
                  className="max-h-[150px] min-h-[20px] pointer-events-none mx-auto"
                />
              </div>
              <button
                onClick={() => {
                  handleClick();
                  playClickSound();
                }}
                className="my-1 mx-auto text-center w-full transition duration-50 ease hover:scale-110 cursor-pointer lilita-one-regular text-5xl text-yellow-300 text-stroke-black text-shadow-yellow-500 hover:text-shadow-lg z-30 text-glow active:scale-80"
              >
                SoloRush
              </button>
              <button
                onClick={() => {
                  handleTwoPlayer();
                  playClickSound();
                }}
                className="my-1 mx-auto text-center w-full transition duration-50 ease hover:scale-110 cursor-pointer lilita-one-regular text-5xl text-blue-400 text-stroke-black text-shadow-yellow-500 hover:text-shadow-lg z-30 text-glow active:scale-80"
              >
                PvP
              </button>
              <button
                onClick={() => {
                  handleHTP();
                  playClickSound();
                }}
                className="my-1 mx-auto text-center w-full transition duration-50 ease hover:scale-110 cursor-pointer lilita-one-regular text-4xl text-white text-stroke-black text-shadow-yellow-500 hover:text-shadow-lg z-30  active:scale-80"
              >
                How to Play
              </button>
              <button
                onClick={() => {
                  handleAbout();
                  playClickSound();
                }}
                className="my-1 mx-auto text-center w-full transition duration-50 ease hover:scale-110 cursor-pointer lilita-one-regular text-4xl text-white text-stroke-black text-shadow-yellow-500 hover:text-shadow-lg z-30  active:scale-80"
              >
                About
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
