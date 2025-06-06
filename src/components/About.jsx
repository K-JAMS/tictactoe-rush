import React from "react";
import JamSol from "../assets/images/jamsolutions-icon.avif";

export const About = ({ setAbout, playClickSound, isMuted }) => {
  return (
    <div className="flex max-w-[500px] h-screen items-center justify-center mx-auto">
      <div className="p-5 pb-10 bg-orange-500 border-15 border-black mx-auto relative">
        <button
          className="absolute top-1 right-2 text-black text-4xl bg-white-600 px-2  hover:text-white transition duration-300 cursor-pointer"
          onClick={() => {
            setAbout(false);
            playClickSound();
          }}
        >
          &times;
        </button>
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center text-yellow-400 lilita-one-regular text-stroke-black text-shadow-md text-shadow-black">
          About
        </h1>
        <p className="text-black text-xs text-justify md:text-sm lg:text-md xl:text-[15px] mt-3 text-shadow-sm">
          The game was built using React components. The coin toss uses state
          and timers to animate and determine the starting player. The Tic Tac
          Toe board tracks moves and game state. The opponent’s moves are
          generated using programmed strategies and conditional logic to respond
          to the player’s moves.
        </p>
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-center pt-5 lilita-one-regular text-shadow-md text-shadow-black">
          ⚠️ Disclaimer
        </h1>
        <p className="text-black text-xs text-justify md:text-sm lg:text-md xl:text-[15px] mt-3 text-shadow-sm">
          This game was built with the help of AI and is made for educational
          purposes to better understand React and its libraries.
        </p>
        <p className = "mt-5 flex justify-center items-center">Created by:</p>
        <div className="flex w-full justify-center items-center">
          <img className="max-h-[40px]" src={JamSol} />
          <p className="text-3xl font-mono font-bold align-middle flex justify-center items-center pointer-events-none">
            <span className=" bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent leading-right">
              JAM
            </span>
            <span className="text-blue-600">Solutions</span>
          </p>
        </div>
      </div>
    </div>
  );
};
