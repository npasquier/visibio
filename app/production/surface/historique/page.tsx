import BioFarmMap from "@/components/BioFarmMap";


const defaultAttribute = "nb_expSum";
const dataBaseName = "surface-2007-2022";

const attributeArray = [
  { abrev: "nb_expSum", value: "Nombre d'exploitations engagées" },
  { abrev: "surfabSum", value: "Surface Bio à terme (ha)" },
  { abrev: "surfc1Sum", value: "Surface Bio 1ère année (ha)" },
  { abrev: "surfc2Sum", value: "Surface Bio 2ème année (ha)" },
  { abrev: "surfc3Sum", value: "Surface Bio 3ème année (ha)" },
  { abrev: "surfc123Sum", value: "Surface Bio en conversion (ha)" },
  { abrev: "surfbioSum", value: "Surface Bio engagée (ha)" },
];

const keysToSum = [
  "surfab",
  "surfc1",
  "surfc2",
  "surfc3",
  "surfc123",
  "surfbio",
  "nb_exp",
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
