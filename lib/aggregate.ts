import { RawDataProps } from "@/interface/data";
import * as d3 from "d3";

function sumDataByRegion(data: any[], keysToSum: string[]) {
  const sums: { [key: string]: number } = {};

  keysToSum.forEach((key) => {
    // The corresponding sum key in the result object
    const sumKey = key + "Sum";

    // Determine whether to parse as float or integer based on the key
    sums[sumKey] = d3.sum(data, (d: any) =>
      parseFloat(d[key].replace(",", "."))
    );
  });

  return sums;
}

function convertToArray(rollupData: any) {
  return Array.from(rollupData, ([region, values]) => ({
    region,
    ...values,
  }));
}

export function aggregator(
  data: RawDataProps[],
  selectedProductions: Set<string>,
  selectedYear: number,
  keysToSum: string[],
  selector: string
) {
  console.log("Running aggregator");
  // Filter data by year
  const filteredDataByYear = data.filter(
    (d) => d.annee === selectedYear.toString()
  );

  // Numeric years
  const basedYear2022 = data.filter((d) => d.annee === "2022");
  const basedYear2007 = data.filter((d) => d.annee === "2007");

  // Filter data for year of interest
  const isAllSelected = selectedProductions.has("ALL");
  const filteredData = isAllSelected
    ? filteredDataByYear
    : filteredDataByYear.filter((d: any) =>
        selectedProductions.has(d[selector])
      );

  // Filter data for numeric years
  const filteredData2022 = isAllSelected
    ? basedYear2022
    : basedYear2022.filter((d) => selectedProductions.has(d[selector]));
  const filteredData2007 = isAllSelected
    ? basedYear2007
    : basedYear2007.filter((d) => selectedProductions.has(d[selector]));

  const sumByRegion = d3.rollup(
    filteredData,
    (v) => sumDataByRegion(v, keysToSum),
    (d) => d.nomregion
  );

  const sumByRegion2022 = d3.rollup(
    filteredData2022,
    (v) => sumDataByRegion(v, keysToSum),
    (d) => d.nomregion
  );
  const sumByRegion2007 = d3.rollup(
    filteredData2007,
    (v) => sumDataByRegion(v, keysToSum),
    (d) => d.nomregion
  );

  // Convert to array
  const aggregated = convertToArray(sumByRegion);
  const arrayAggregatedData2007 = convertToArray(sumByRegion2007);
  const arrayAggregatedData2022 = convertToArray(sumByRegion2022);


  return {
    aggregatedData: aggregated,
    aggregatedData2007: arrayAggregatedData2007,
    aggregatedData2022: arrayAggregatedData2022,
  };
}
