import NavigationCard from "@/components/NavigationCard";

export default function Page() {
  return (
    <main className="flex-grow p-4 flex flex-col items-center gap-4">
      <div className="flex flex-col items-center  2xl:my-12 my-8">
        <p className="text-xl my-4">
          Choissisez le type d&apos;évolution à visualiser.
        </p>
      </div>

      <div className="flex justify-around w-[90rem]">
        <NavigationCard
          path={"/production/cheptel/historique"}
          lottieName="historique"
          title="Historique"
          description="Visualiser l'évolution des surfaces bio en France par régions
          ou département. Vous pouvez également comparer les surfaces bio en
          filtrant par type de production (raisin de cuve, noix, etc.)"
          style="h-[220px] w-[300px]"
        />
        <NavigationCard
          path={"/production/cheptel/conversion"}
          lottieName="conversion"
          title="Dynamique des conversions"
          description="Visualiser l'évolution des conversions bio en France par régions
          ou département. Vous pouvez également comparer les conversions bio en
          filtrant par type de production (poules, bovins, etc.)"
          style="h-[220px] w-[300px]"
        />
      </div>
    </main>
  );
}
