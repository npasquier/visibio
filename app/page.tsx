import NavigationCard from "@/components/NavigationCard";

export default function Page() {
  return (
    <main className="flex-grow p-4 flex flex-col items-center gap-4">
      <div className="flex flex-col items-center  gap-4 my-12">
        <h2 className="text-2xl font-bold">Production bio en France</h2>

        <p className="text-lg">Analyse de la production bio en France.</p>
      </div>

      <div className="mx-auto p-4">
        <NavigationCard />
      </div>
    </main>
  );
}
