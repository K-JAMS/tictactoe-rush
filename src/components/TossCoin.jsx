import React, { useState } from "react";
import { Home } from "./Home";

export const TossCoin = ({onFinish}) => {
  const [step, setStep] = useState("idle");
  const [image, setImage] = useState("/img/coin/head.png");
  const [isCoin, setIsCoin] = useState(null);

  const handleFlip = () => {
    setImage("/img/coin/head.png");
    setStep("preparing");
    setTimeout(() => {
        const random = Math.floor(Math.random() * 2) + 1;
        setIsCoin(random);
        setStep("flip");

        const firstImage =
          random === 1 ? "/img/coin/Heads.gif" : "/img/coin/Tails.gif";
        const secondImage =
          random === 2 ? "/img/coin/tail.png" : "/img/coin/head.png";

        setImage(firstImage);

        setTimeout(() => {
          setImage(secondImage);
          setStep("landed");
          
          setTimeout(() => {
            setStep("idle");
            setImage("/img/coin/head.png");
            onFinish(random);
          }, 1000);
        }, 2000);
    }, 0)
  };

  return (
    <section className="min-w-[150px] mx-auto my-auto">
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
          className={`text-center text-2xl text-black object-contain pointer-events-none m-auto lilita-one-regular ${
            step === "idle" ? "" : "invisible"
          }`}
        >
          Tap Anywhere to Flip the Coin
        </h2>
        <h2
          className={`text-center text-5xl text-yellow-500 object-contain pointer-events-none m-auto lilita-one-regular text-stroke ${
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
