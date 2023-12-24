// components/ImageCard.tsx
"use client";

import Link from "next/link";
import { Player } from "@lottiefiles/react-lottie-player";

const ImageCard: React.FC = () => {
  return (
    <Link href="/surface-history-map" className="group">
      <div className="w-[400px] block border-2 rounded-3xl overflow-hidden shadow-lg group-hover:ring group-hover:ring-green-700  group-hover:bg-white transition-shadow bg-slate-50">
        <Player
          autoplay
          loop
          src="/lotties/surface.json"
          className="h-[300px] w-[300px] md:h-full md:w-[400px]  "
        />
        <div className="flex flex-col gap-3 p-4 mt-12">
          <h3 className="font-semibold text-lg mb-2 text-center">
            Surfaces Bio en Carte
          </h3>

          <p className="text-gray-600 text-sm text-center">
            Visualiser l&apos;évolution des surfaces bio en France par régions
            ou département. Vous pouvez également comparer les surfaces bio en
            filtrant par type de production (raisin de cuve, noix, etc.)
          </p>

          <p className="text-gray-600 text-sm text-center">
            Source: Agence Bio
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ImageCard;
