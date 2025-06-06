import React, { useRef, useState } from "react";
import { Home } from "./Home";

import coinhead from "../assets/images/coins/head.avif";
import cointail from "../assets/images/coins/tail.avif";
import headflip from "../assets/images/coins/Heads.gif";
import tailflip from "../assets/images/coins/Tails.gif";
import coinSound from "../assets/audio/coinflip.mp3";
import coinDropSound from "../assets/audio/win.mp3";

export const TossCoin = ({ onFinish, isMuted }) => {
  const [step, setStep] = useState("idle");
  const [image, setImage] = useState(coinhead);
  const [isCoin, setIsCoin] = useState(null);
  const coinAudioRef = useRef(null);
  const dropAudioRef = useRef(null);

  const playCoinSound = () => {
    if (!isMuted && coinAudioRef.current) {
      const sound = coinAudioRef.current.cloneNode();
      sound.play();
    }
  };
  const playDropSound = () => {
    if (!isMuted && dropAudioRef.current) {
      const sound = dropAudioRef.current.cloneNode();
      sound.play();
    }
  };

  const handleFlip = () => {
    playCoinSound();
    setImage(coinhead);
    setStep("preparing");
    setTimeout(() => {
      const random = Math.floor(Math.random() * 2) + 1;
      setIsCoin(random);
      setStep("flip");

      const firstImage = random === 1 ? headflip : tailflip;
      const secondImage = random === 2 ? cointail : coinhead;

      setImage(firstImage);

      setTimeout(() => {
        playDropSound();
        setImage(secondImage);
        setStep("landed");

        setTimeout(() => {
          setStep("idle");
          onFinish(random);
        }, 1000);
      }, 2000);
    }, 0);
  };
  

  return (
    <section className="min-w-[150px] mx-auto my-auto">
      <audio ref={coinAudioRef} src={coinSound} preload="auto" />
      <audio ref={dropAudioRef} src={coinDropSound} preload="auto" />
      <div
        onClick={handleFlip}
        className={`block items-center justify-center pt-50 ${
          step !== "idle" ? "pointer-events-none" : "cursor-pointer"
        }`}
      >
        <img
          src={image}
          alt="Displayed"
          className={`w-64 object-contain pointer-events-none m-auto ${
            step === "flip" ? "flipping" : ""
          }`}
        />
        <h2
          className={`text-center text-2xl text-white text-shadow-lg show-fade object-contain pointer-events-none m-auto lilita-one-regular ${
            step === "idle" ? "" : "invisible"
          }`}
        >
          Tap anywhere to Flip the Coin
        </h2>
        <h2
          className={`text-center text-5xl text-yellow-500 object-contain pointer-events-none m-auto lilita-one-regular text-stroke-white ${
            step === "landed" ? "" : "invisible"
          }`}
        >
          {isCoin === 1 ? "You go First!" : "You go Second!"}
        </h2>
      </div>
      <div className="flex items-center justify-center"></div>
    </section>
  );
};
