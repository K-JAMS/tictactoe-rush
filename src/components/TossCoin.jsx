import React, { useState } from "react";
import { Home } from "./Home";

const coinhead =
  "https://raw.githubusercontent.com/janrelsaves/tttr-imgs/main/assets/images/coins/head.avif";
const cointail =
  "https://raw.githubusercontent.com/janrelsaves/tttr-imgs/refs/heads/main/assets/images/coins/tail.avif";
const headflip =
  "https://raw.githubusercontent.com/janrelsaves/tttr-imgs/refs/heads/main/assets/images/coins/Heads.gif";
  const tailflip =
    "https://raw.githubusercontent.com/janrelsaves/tttr-imgs/refs/heads/main/assets/images/coins/Tails.gif";

export const TossCoin = ({ onFinish }) => {
  const [step, setStep] = useState("idle");
  const [image, setImage] = useState(coinhead);
  const [isCoin, setIsCoin] = useState(null);

  const handleFlip = () => {
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
      <div
        onClick={handleFlip}
        className={`block items-center justify-center pt-50 ${
          step !== "idle" ? "pointer-events-none" : "cursor-pointer"
        }`}
      >
        <img
          src={image}
          alt="Displayed"
          loading="lazy"
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
