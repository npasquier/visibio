"use client";

import { Player } from "@lottiefiles/react-lottie-player";

const LottieFrance = () => {
  return (
    <Player
      autoplay
      loop
      src={"/lotties/france.json"}
      className="h-[300px] w-[300px] md:h-full md:w-[400px]  "
    />
  );
};

export default LottieFrance;
