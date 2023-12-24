"use client";

import { Player } from "@lottiefiles/react-lottie-player";

const LottieSurface = () => {
  return (
    <Player
      autoplay
      loop
      src="/lotties/surface.json"
      className="h-[300px] w-[300px] md:h-[400px] md:w-[400px] " 
      />
  );
};

export default LottieSurface;
