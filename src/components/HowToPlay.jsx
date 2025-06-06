import React, { useState } from "react";

export const HowToPlay = ({ setHtp, playClickSound, isMuted}) => {
  const [show, setShow] = useState(false);

  const solo = (
    <div>
      <h1 className="text-2xl text-center md:text-3xl lg:text-4xl xl:text-5xl text-shadow-sm text-white lilita-one-regular text-stroke-black">
        How to Play?
      </h1>
      <p className="text-black text-center text-md md:text-lg lg:text-xl xl:text-[17px] text-shadow-sm py-10">
        You and your Opponent take turns placing <i class="fa-solid fa-x"></i>{" "}
        or <i class="fa-regular fa-circle"></i> on a 3×3 grid. Win by aligning 3
        symbols in a row: vertically, horizontally, or diagonally.
      </p>
    </div>
  );

  const rush = (
    <>
      <h1 className="text-2xl text-center md:text-3xl lg:text-4xl xl:text-5xl text-shadow-sm text-white lilita-one-regular text-stroke-black">
        Rush
      </h1>
      <h2 className="text-md md:text-lg lg:text-xl xl:text-[25px] text-shadow-sm text-white lilita-one-regular">
        ⏱️ Time Limit
      </h2>
      <p className="text-black text-sm md:text-md lg:text-lg xl:text-[15px] text-shadow-lg pb-3">
        You have a global timer, when it hits 0, it’s game over. You also have a
        countdown for each move. Take too long and you lose your turn! Winning
        adds time, while losing subtracts time.
      </p>
      <h2 className="text-md md:text-lg lg:text-xl xl:text-[25px] text-shadow-sm text-white lilita-one-regular">
        🎯 Scoring System
      </h2>
      <p className="text-black text-sm md:text-md lg:text-lg xl:text-[15px] text-shadow-lg pb-2">
        Each win earns 100 points plus bonus points based on your Combo. You
        lose points if the Opponent wins. A draw gives no points.
      </p>
      <h2 className="text-md md:text-lg lg:text-xl xl:text-[25px] text-shadow-sm text-white lilita-one-regular">
        🔥 Combo
      </h2>
      <p className="text-black text-sm md:text-md lg:text-lg xl:text-[15px] text-shadow-lg pb-2">
        Winning multiple times in a row builds a Combo. Combos increase your
        bonus score and time rewards. Combo resets if you lose or draw.
      </p>
    </>
  );

  return (
    <div className="flex max-w-[500px] h-screen items-center justify-center mx-auto">
      <div className="p-5 bg-orange-500 border-15 border-black mx-auto relative">
        <button
          className="absolute top-1 right-2 text-black text-4xl bg-white-600 px-2  hover:text-white transition duration-300 cursor-pointer"
          onClick={() => {
            {
              setHtp(false);
              setShow(false);
              playClickSound();
            }
          }}
        >
          &times;
        </button>
        <div className="min-h-[200px]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center text-yellow-400 lilita-one-regular text-stroke-black text-shadow-md text-shadow-black">
            TicTacToe
          </h1>
          {show ? rush : solo}
        </div>
        <div className="max-w-full flex justify-center">
          <button
            onClick={() => {
              setShow(!show);
              playClickSound();
            }}
            className="my-1 mx-auto text-center w-full transition duration-300 ease hover:scale-110 cursor-pointer lilita-one-regular text-5xl text-white text-stroke-black text-shadow-yellow-300 text-shadow-lg show-fade"
          >
            {show ? "Back" : "Rush"}
          </button>
        </div>
      </div>
    </div>
  );
};
