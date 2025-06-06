import "../App.css";
import React, { useEffect, useState } from "react";
import "../index.css";
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


export const LoadingScreen = ({ onComplete }) => {
    useEffect(() => {
      const images = [TTTRLogo, PixelBg, Cross, Circle, Head, Tail, HeadsGif, TailsGif, ChicFront, ChicBack];

      images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });

      const timeout = setTimeout(() => {
        onComplete();
      }, 2000);

      return () => clearTimeout(timeout);
    }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-blue-200 to-green-800 flex flex-col items-center justify-center">
      <img
        src={TTTRLogo}
        alt="Logo"
        className="max-w-[300px] pointer-events-none"
      />

      <div className="w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
        <div className="w-[40%] h-full bg-yellow-500 shadow-[0_0_15px_#3b82f6] animate-loading-bar"></div>
      </div>
    </div>
  );
};
