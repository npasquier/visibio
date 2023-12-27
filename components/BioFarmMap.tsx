"use client";

import React, { useCallback, useEffect, useState } from "react";
import * as d3 from "d3";
import TableAggregatedData from "./TableAggregatedData";
import FranceMap from "./FranceMap";
import Select from "react-select";
import { AggregatedDataProps, RawDataProps } from "@/interface/data";
import { aggregator } from "@/lib/aggregate";
import { translator } from "@/lib/translate";

const BioFarmMap = ({
  defaultAttribute,
  dataBaseName,
  attributeArray,
  keysToSum,
  selector,
}: {
  defaultAttribute: keyof AggregatedDataProps;
  dataBaseName: string;
  attributeArray: { abrev: string; value: string }[];
  keysToSum: string[];
  selector: string;
}) => {
  // Play history of surface
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Fix for SSR and Select component
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Tabs and loading state
  const [activeTab, setActiveTab] = useState<string>("Graph");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Filter by production type
  const [productionTypes, setProductionTypes] = useState<Set<string>>(
    new Set<string>()
  );
  const [selectedProductions, setSelectedProductions] = useState<Set<string>>(
    new Set(["ALL"])
  );

  //Filter by year
  const [selectedYear, setSelectedYear] = useState<number>(2022);

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

  // Handle tab clicks and loading state
  const handleTabClick = (tabName: string) => {
    setIsLoading(true);
    setActiveTab(tabName);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Aggregate data with potential filters
  const aggregateData = useCallback(() => {
    const response = aggregator(
      rawData,
      selectedProductions,
      selectedYear,
      keysToSum,
      selector
    );
    setAggregatedData(response.aggregatedData);
    setAggregatedData2007(response.aggregatedData2007);
    setAggregatedData2022(response.aggregatedData2022);
  }, [rawData, selectedProductions, selectedYear, keysToSum, selector]);

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
    if (selectedYear === 2022) {
      setSelectedYear(2007); // Reset to 2007 if already at 2022
    }
  };

  const [selectedAttribute, setSelectedAttribute] =
    useState<keyof AggregatedDataProps>(defaultAttribute);

  // Set up options for dropdown
  const standardOptions = Array.from(productionTypes).map((type) => ({
    label: translator(type),
    value: type,
  }));

  const allProductionsOption = { label: "Tout type", value: "ALL" };
  const options = [allProductionsOption, ...standardOptions];

  // Fetch data and send to states
  useEffect(() => {
    d3.dsv(";", "/data/" + dataBaseName + ".csv").then((data) => {
      setRawData(data);
      setProductionTypes(new Set(data.map((d) => d[selector])));
    });
  }, [dataBaseName, selector]);

  // Update aggregated data when filters change
  useEffect(() => {
    aggregateData();
  }, [rawData, selectedProductions, selectedYear, aggregateData]);

  // Handle dropdown changes
  const handleDropdownChange = (selectedOptions: any) => {
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
    <div className="flex flex-row items-center justify-around mx-3 w-screen h-full">
      <div className="flex flex-col justify-around h-[30rem]">
        <div>
          <h2 className="text-2xl font-bold">Filtre :</h2>
        </div>
        <div className="flex flex-col gap-12">
          <div className="flex align-middle gap-3">
            <span className="my-auto">Production : </span>
            <div>
              {isClient && (
                <Select
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
                    Sélection : {selectedYear}
                  </span>
                </span>
                <span className="text-xs text-gray-700 dark:text-gray-400">
                  Max: 2022
                </span>
              </div>
              <div className="play-button-container">
                <button
                  onClick={handlePlayClick}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-md"
                >
                  {isPlaying && selectedYear != 2022 ? "Pause" : "Animer"}
                </button>
              </div>
            </div>
          </div>
          <div className="flex mb-4">
            <span>
              <h2 className="text-lg mr-4">Attribut : </h2>
            </span>
            <select
              value={selectedAttribute}
              onChange={(e: any) => setSelectedAttribute(e.target.value)}
            >
              {attributeArray.map((attribute) => (
                <option key={attribute.abrev} value={attribute.abrev}>
                  {attribute.value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
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
        <div className="flex flex-col w-[45rem] h-[40rem] 2xl:h-[45rem] overflow-hidden bg-gray-100">
          {isLoading ? (
            <div className="flex justify-center items-center h-[40rem] 2xl:h-[45rem]  w-[45rem] align-middle bg-gray-100">
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
                <div className="h-[40rem] 2xl:h-[45rem]  w-[45rem] ">
                  <TableAggregatedData
                    aggregatedData={aggregatedData}
                    attributeArray={attributeArray}
                  />
                </div>
              )}

              {activeTab === "Graph" && (
                <div className="max-xl:h-[40rem] h-[45rem] w-[45rem] overflow-scroll">
                  <FranceMap
                    aggregatedData={aggregatedData}
                    aggregatedData2007={aggregatedData2007}
                    aggregatedData2022={aggregatedData2022}
                    passedAttribute={selectedAttribute}
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
