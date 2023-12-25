import LottieFrance from "@/components/LottieFrance";
import Link from "next/link";

export default function Page() {
  return (
    <main className="p-4 flex flex-col items-center h-full">
      <div className="flex flex-col items-center gap-6 my-12 h-full justify-normal">
        <h2 className="text-3xl font-bold">Cartographie du Bio en France</h2>

        <h4 className="text-xl">Analyse de la production bio en France métropolitaine.</h4>

        <div className="flex flex-col items-center gap-3">
          <p className="text-md">
            Cette application vous permet de visualiser l&apos;évolution de la production bio en France
            métropolitaine.
          </p>

          <p className="text-md">
            Vous pouvez visualiser ces évolutions par régions ou départements.
          </p>
        </div>

        <div>
          <LottieFrance />
        </div>

        <div>
          <button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
            <Link href="/production">Accéder aux cartes</Link>
          </button>
        </div>

        <p className="text-sm mt-auto">
          Les données utilisées sont celles de l&apos;Agence
          BIO.
        </p>
      </div>
    </main>
  );
}
