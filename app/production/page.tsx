import NavigationCard from "@/components/NavigationCard";

export default function Page() {
  return (
    <main className="flex-grow p-4 flex flex-col items-center gap-4">
      <div className="flex flex-col items-center  gap-4 my-20">

        <p className="text-xl">Choissisez le type de production en France.</p>
      </div>

      <div className="flex justify-around w-[90rem]">
        <NavigationCard
          path={"/production/surface"}
          lottieName="surface"
          title="Surfaces"
          description="Visualiser l&apos;évolution des surfaces bio en France par régions
          ou département. Vous pouvez également comparer les surfaces bio en
          filtrant par type de production (raisin de cuve, noix, etc.)"
          style="h-[300px] w-[300px] md:h-full md:w-[400px]"
        />
        <NavigationCard
          path={"/production/cheptel"}
          lottieName="cheptel"
          title="Cheptels"
          description="Visualiser l&apos;évolution des cheptels bio en France par régions
          ou département. Vous pouvez également comparer les cheptels bio en
          filtrant par type de production (poules, bovins, etc.)"
          style="h-[300px] w-[300px] md:h-full md:w-[400px]"
        />
      </div>
    </main>
  );
}
