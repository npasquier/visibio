import BioFarmMap from "@/components/BioFarmMap";


const defaultAttribute = "nb_expSum";
const dataBaseName = "cheptel-2007-2022";

const attributeArray = [
  { abrev: "nb_expSum", value: "Nombre d'exploitations engagées" },
  { abrev: "tetesabSum", value: "Cheptel à terme" },
  { abrev: "tetesconversionsSum", value: "Cheptel en conversion" },
  { abrev: "tetesbioSum", value: "Cheptel total engagé" },
];

const keysToSum = [
  "nb_exp",
  "tetesab",
  "tetesconversions",
  "tetesbio",
];

const selector = "code_groupe";

export default function Page() {

  return (
    <main className="relative flex flex-auto h-60 ">  
            <BioFarmMap 
            defaultAttribute={defaultAttribute} 
            dataBaseName={dataBaseName}
            attributeArray={attributeArray}    
            keysToSum={keysToSum}
            selector={selector}
            />
    </main>
  );
}
