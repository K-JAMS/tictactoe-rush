import "../App.css";
import React, { useEffect, useState } from "react";
import "../index.css";

export const LoadingScreen = ({ onComplete }) => {
  const [loaded, setLoaded] = useState(false);

  const imagesToPreload = [
    "https://raw.githubusercontent.com/janrelsaves/tttr-imgs/main/assets/images/coins/head.avif",
    "https://raw.githubusercontent.com/janrelsaves/tttr-imgs/refs/heads/main/assets/images/coins/tail.avif",
    "https://raw.githubusercontent.com/janrelsaves/tttr-imgs/refs/heads/main/assets/images/coins/Heads.gif",
    "https://raw.githubusercontent.com/janrelsaves/tttr-imgs/refs/heads/main/assets/images/coins/Tails.gif",
    "https://raw.githubusercontent.com/janrelsaves/tttr-imgs/refs/heads/main/assets/images/Circle.avif",
    "https://raw.githubusercontent.com/janrelsaves/tttr-imgs/refs/heads/main/assets/images/Cross.avif",
    "https://raw.githubusercontent.com/janrelsaves/tttr-imgs/refs/heads/main/assets/images/TTTR.avif",
  ];

  useEffect(() => {
    let loadedCount = 0;

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === imagesToPreload.length) {
          setLoaded(true);
          setTimeout(onComplete, 2000);
        }
      };
    });
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-blue-200 to-green-800 flex flex-col items-center justify-center">
      <img
        src="https://raw.githubusercontent.com/janrelsaves/tttr-imgs/refs/heads/main/assets/images/TTTR.avif"
        alt="Logo"
        className="max-w-[300px]"
      />

      <div className="w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
        <div className="w-[40%] h-full bg-yellow-500 shadow-[0_0_15px_#3b82f6] animate-loading-bar"></div>
      </div>
    </div>
  );
};
