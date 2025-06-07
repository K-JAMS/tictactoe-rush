import { useEffect, useRef, useState } from 'react';
import './App.css'
import { Home } from './components/Home'
import { LoadingScreen } from './components/LoadingScreen';
import PixelBg from "./assets/images/pixelbg.avif";
import bgMusic from "./assets/audio/theme.mp3";
import ChicFront from "./assets/images/ChichicFront.gif";


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLanded, setIsLanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isLanded) {
      const audio = new Audio(bgMusic);
      audio.loop = true;
      audio.volume = 1;
      audio.muted = isMuted;

      audio
        .play()
        .then(() => console.log("Audio started"))
        .catch((err) => console.warn("Autoplay blocked:", err));

      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [isLanded, isMuted]); // ✅ watch isLanded

  return (
    <div
      className={`w-full min-w-[150px] mx-auto h-screen fixed bg-cover bg-center`}
      style={{ backgroundImage: `url(${PixelBg})` }}
    >
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div
        className={`min-h-screen transition-opacity duration-700 z-40 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } text-gray-100`}
      >
        {isLanded && (
          <Home isMuted={isMuted} setIsMuted={setIsMuted} className="z-30" />
        )}
        {!isLanded && (
          <div className="h-screen w-screen flex justify-center items-center">
            <button
              onClick={() => setIsLanded(true)}
              className="text-center mx-auto text-6x text-5xl lilita-one-regular transition duration-50 ease hover:scale-110 text-stroke-black cursor-pointer show-fade active:scale-80"
            >
              Start
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App
