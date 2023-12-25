// components/ImageCard.tsx
"use client";

import Link from "next/link";
import { Player } from "@lottiefiles/react-lottie-player";

const NavigationCard = ({
  path,
  lottieName,
  title,
  description,
  style
}: {
  path: string;
  lottieName: string;
  title: string;
  description: string;
  style:string
}) => {
  return (
    <Link href={path} className="group hover:scale-105 transform transition duration-200">
      <div className="w-[400px] block border-2 rounded-3xl overflow-hidden shadow-lg group-hover:ring group-hover:ring-green-700  group-hover:bg-white transition-shadow bg-slate-50">
        <Player
          autoplay
          loop
          src={"/lotties/" + lottieName + ".json"}
          className={style}
        />
        <div className="flex flex-col gap-3 p-4 mt-12">
          <h3 className="font-semibold text-xl mb-2 text-center">{title}</h3>

          <p className="text-gray-600 text-sm text-center">{description}</p>

          <p className="text-gray-600 text-sm text-center">
            Source: Agence Bio
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NavigationCard;
