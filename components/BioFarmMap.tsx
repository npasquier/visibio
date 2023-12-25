"use client";

import React, { useCallback, useEffect, useState } from "react";
import * as d3 from "d3";
import TableAggregatedData from "./TableAggregatedData";
import FranceMap from "./FranceMap";
import ReactSelect from "react-select";

interface RawDataProps {
  [key: string]: string;
}

interface AggregatedDataProps {
  region: string;
  surfabSum: number;
  nbExpSum: number;
  surfc1Sum: number;
  surfc2Sum: number;
  surfc3Sum: number;
  surfc123Sum: number;
  surfbioSum: number;
}

const BioFarmMap = () => {
  // Play history of surface
  const [isPlaying, setIsPlaying] = useState(false);

  // Fix for SSR and Select component
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Tabs and loading state
  const [activeTab, setActiveTab] = useState<string>("Graph");
  const [isLoading, setIsLoading] = useState(false);

  const handleTabClick = (tabName: string) => {
    setIsLoading(true);
    setActiveTab(tabName);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Filter by production type
  const [productionTypes, setProductionTypes] = useState(new Set<string>());
  const [selectedProductions, setSelectedProductions] = useState<Set<string>>(
    new Set(["ALL"])
  );

  console.log(selectedProductions);

  //Filter by year
  const [selectedYear, setSelectedYear] = useState(2022);

  //Design the year slider
  const yearMarkers = [];
  for (let year = 2007; year <= 2022; year++) {
    yearMarkers.push(year);
  }

  // Put data in state
  const [rawData, setRawData] = useState<RawDataProps[]>([]);
  const [aggregatedData, setAggregatedData] = useState<AggregatedDataProps[]>(
    []
  );
  const [aggregatedData2007, setAggregatedData2007] = useState<
    AggregatedDataProps[]
  >([]);
  const [aggregatedData2022, setAggregatedData2022] = useState<
    AggregatedDataProps[]
  >([]);

  //

  // Aggregate data with potential filters
  const aggregateData = useCallback((data: RawDataProps[]) => {
    // Filter data by year
    const filteredDataByYear = data.filter(
      (d) => d.annee === selectedYear.toString()
    );

    // Numeric years
    const basedYear2022 = rawData.filter((d) => d.annee === "2022");
    const basedYear2007 = rawData.filter((d) => d.annee === "2007");

    // Filter data for year of interest
    const isAllSelected = selectedProductions.has("ALL");
    const filteredData = isAllSelected
      ? filteredDataByYear
      : filteredDataByYear.filter((d) => selectedProductions.has(d.production));

    // Filter data for numeric years
    const filteredData2022 = isAllSelected
      ? basedYear2022
      : basedYear2022.filter((d) => selectedProductions.has(d.production));
    const filteredData2007 = isAllSelected
      ? basedYear2007
      : basedYear2007.filter((d) => selectedProductions.has(d.production));

    // Aggregate filtered data
    const sumByRegion = d3.rollup(
      filteredData,
      (v) => {
        return {
          surfabSum: d3.sum(v, (d) => parseFloat(d.surfab.replace(",", "."))),
          surfc1Sum: d3.sum(v, (d) => parseFloat(d.surfc1.replace(",", "."))),
          surfc2Sum: d3.sum(v, (d) => parseFloat(d.surfc2.replace(",", "."))),
          surfc3Sum: d3.sum(v, (d) => parseFloat(d.surfc3.replace(",", "."))),
          surfc123Sum: d3.sum(v, (d) =>
            parseFloat(d.surfc123.replace(",", "."))
          ),
          surfbioSum: d3.sum(v, (d) => parseFloat(d.surfbio.replace(",", "."))),
          nbExpSum: d3.sum(v, (d) => parseInt(d.nb_exp)),
        };
      },
      (d) => d.nomregion
    );

    // Aggregate filtered data for numeric years
    const sumByRegion2022 = d3.rollup(
      filteredData2022,
      (v) => {
        return {
          surfabSum: d3.sum(v, (d) => parseFloat(d.surfab.replace(",", "."))),
          surfc1Sum: d3.sum(v, (d) => parseFloat(d.surfc1.replace(",", "."))),
          surfc2Sum: d3.sum(v, (d) => parseFloat(d.surfc2.replace(",", "."))),
          surfc3Sum: d3.sum(v, (d) => parseFloat(d.surfc3.replace(",", "."))),
          surfc123Sum: d3.sum(v, (d) =>
            parseFloat(d.surfc123.replace(",", "."))
          ),
          surfbioSum: d3.sum(v, (d) => parseFloat(d.surfbio.replace(",", "."))),
          nbExpSum: d3.sum(v, (d) => parseInt(d.nb_exp)),
        };
      },
      (d) => d.nomregion
    );
    const sumByRegion2007 = d3.rollup(
      filteredData2007,
      (v) => {
        return {
          surfabSum: d3.sum(v, (d) => parseFloat(d.surfab.replace(",", "."))),
          surfc1Sum: d3.sum(v, (d) => parseFloat(d.surfc1.replace(",", "."))),
          surfc2Sum: d3.sum(v, (d) => parseFloat(d.surfc2.replace(",", "."))),
          surfc3Sum: d3.sum(v, (d) => parseFloat(d.surfc3.replace(",", "."))),
          surfc123Sum: d3.sum(v, (d) =>
            parseFloat(d.surfc123.replace(",", "."))
          ),
          surfbioSum: d3.sum(v, (d) => parseFloat(d.surfbio.replace(",", "."))),
          nbExpSum: d3.sum(v, (d) => parseInt(d.nb_exp)),
        };
      },
      (d) => d.nomregion
    );

    // Convert to array
    const aggregated = Array.from(sumByRegion, ([region, values]) => ({
      region,
      surfabSum: values.surfabSum,
      surfc1Sum: values.surfc1Sum,
      surfc2Sum: values.surfc2Sum,
      surfc3Sum: values.surfc3Sum,
      surfc123Sum: values.surfc123Sum,
      surfbioSum: values.surfbioSum,
      nbExpSum: values.nbExpSum,
    }));

    // Convert to array numeric years
    const arrayAggregatedData2007 = Array.from(
      sumByRegion2007,
      ([region, values]) => ({
        region,
        surfabSum: values.surfabSum,
        surfc1Sum: values.surfc1Sum,
        surfc2Sum: values.surfc2Sum,
        surfc3Sum: values.surfc3Sum,
        surfc123Sum: values.surfc123Sum,
        surfbioSum: values.surfbioSum,
        nbExpSum: values.nbExpSum,
      })
    );
    const arrayAggregatedData2022 = Array.from(
      sumByRegion2022,
      ([region, values]) => ({
        region,
        surfabSum: values.surfabSum,
        surfc1Sum: values.surfc1Sum,
        surfc2Sum: values.surfc2Sum,
        surfc3Sum: values.surfc3Sum,
        surfc123Sum: values.surfc123Sum,
        surfbioSum: values.surfbioSum,
        nbExpSum: values.nbExpSum,
      })
    );

    setAggregatedData(aggregated);
    setAggregatedData2007(arrayAggregatedData2007);
    setAggregatedData2022(arrayAggregatedData2022);
  }, [rawData, selectedProductions, selectedYear]);

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
    if (selectedYear === 2022) {
      setSelectedYear(2007); // Reset to 2007 if already at 2022
    }
  };

  // Set up options for dropdown
  const standardOptions = Array.from(productionTypes).map((type) => ({
    label: type,
    value: type,
  }));
  const allProductionsOption = { label: "Tout type", value: "ALL" };
  const options = [allProductionsOption, ...standardOptions];

  // Fetch data and send to states
  useEffect(() => {
    d3.dsv(";", "/data/surfaces-2007-2022.csv").then((data) => {
      // To see the data in the console
      setRawData(data);
      setProductionTypes(new Set(data.map((d) => d.production)));
    });
  }, []);

  // Update aggregated data when filters change
  useEffect(() => {
    aggregateData(rawData);
  }, [rawData, selectedProductions, selectedYear, aggregateData]);

  // Handle dropdown changes
  const handleDropdownChange = (selectedOptions: any) => {
    console.log(selectedOptions);
    if (
      selectedOptions.some(
        (option: any) => option.value === allProductionsOption.value
      )
    ) {
      // If "All Production Types" is selected, select all options
      setSelectedProductions(new Set(["ALL"]));
    } else {
      // Else, update normally
      const selectedValues = selectedOptions.map((option: any) => option.value);
      setSelectedProductions(new Set(selectedValues));
    }
  };

  console.log(selectedProductions);

  useEffect(() => {
    let intervalId: any;

    if (isPlaying && selectedYear < 2022) {
      intervalId = setInterval(() => {
        setSelectedYear((prevYear) =>
          prevYear < 2022 ? prevYear + 1 : prevYear
        );
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying, selectedYear]);

  return (
    <div className="flex flex-row  items-center justify-around w-screen">
      <div className="flex flex-col p-12 gap-12">
        <div className="mb-auto">
          <h2 className="text-2xl font-bold">Choix du Filtre:</h2>
        </div>
        <div className="flex flex-col gap-12">
          <div className="flex align-middle gap-3">
            <span className="my-auto">Production: </span>
            <div>
              {isClient && (
                <ReactSelect
                  inputId="my-custom-select"
                  value={Array.from(selectedProductions).map((prod) =>
                    options.find((option) => option.value === prod)
                  )}
                  options={options}
                  isMulti
                  onChange={handleDropdownChange}
                  placeholder="Choix du type de production"
                  className="w-[30rem] my-4"
                />
              )}
            </div>
          </div>
          <div className="flex align-middle justify-between gap-3">
            <span className="my-auto">Année: </span>
            <div>
              <div className="flex flex-col items-center">
                <input
                  type="range"
                  min="2007"
                  max="2022"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="w-[30rem] mx-3"
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-700 dark:text-gray-400">
                  Min: 2007
                </span>
                <span>
                  <span className="text-xs text-gray-700 dark:text-gray-400 font-semibold">
                    Selection: {selectedYear}
                  </span>
                </span>
                <span className="text-xs text-gray-700 dark:text-gray-400">
                  Max: 2022
                </span>
              </div>
              <div className="play-button-container">
                <button
                  onClick={handlePlayClick}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {isPlaying && selectedYear != 2022 ? "Pause" : "Play"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col  items-center my-12">
        <div className="flex gap-6 justify-between">
          <div
            className={`cursor-pointer p-2 font-semibold ${
              activeTab === "Aggregated Data" ? "bg-gray-100 rounded-t-lg" : ""
            }`}
            onClick={() => handleTabClick("Aggregated Data")}
          >
            Données
          </div>
          <div
            className={`cursor-pointer p-2 font-semibold ${
              activeTab === "Graph" ? "bg-gray-100 rounded-t-lg" : ""
            }`}
            onClick={() => handleTabClick("Graph")}
          >
            Carte
          </div>
        </div>
        <div className="flex flex-col md:min-w-[45rem] md:min-h-[40rem] w-full  bg-gray-100">
          {isLoading ? (
            <div className="flex justify-center items-center md:h-[40rem] md:min-w-[45rem] w-full align-middle bg-gray-100">
              <svg
                className="animate-spin h-10 w-10 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>{" "}
            </div>
          ) : (
            <>
              {activeTab === "Aggregated Data" && (
                <div className="p-4">
                  <TableAggregatedData aggregatedData={aggregatedData} />
                </div>
              )}

              {activeTab === "Graph" && (
                <div className="p-4 ">
                  <FranceMap
                    aggregatedData={aggregatedData}
                    aggregatedData2007={aggregatedData2007}
                    aggregatedData2022={aggregatedData2022}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BioFarmMap;
