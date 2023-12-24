"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Legend from "./Legend";

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

const FranceMap = ({
  aggregatedData,
  aggregatedData2007,
  aggregatedData2022,
}: {
  aggregatedData: AggregatedDataProps[];
  aggregatedData2007: AggregatedDataProps[];
  aggregatedData2022: AggregatedDataProps[];
}) => {
  const [regions, setRegions] = useState<any>(null);
  const mapRef = useRef(null);

  const [selectedAttribute, setSelectedAttribute] =
    useState<keyof AggregatedDataProps>("surfabSum");

  useEffect(() => {
    fetch("/data/regions.geojson")
      .then((response) => response.json())
      .then((geoJson) => {
        setRegions(geoJson);
      })
      .catch((error) => {
        console.error("Error fetching the GeoJSON: ", error);
      });
  }, []);

  useEffect(() => {
    if (regions && aggregatedData.length > 0) {
      const maxAttributeValue = Math.max(
        ...aggregatedData2022.map((d) => Number(d[selectedAttribute]))
      );
      const minAttributeValue = Math.min(
        ...aggregatedData2007.map((d) => Number(d[selectedAttribute]))
      );

      const colorScale = d3
        .scaleQuantize()
        .domain([minAttributeValue, maxAttributeValue])
        .range(d3.quantize(d3.interpolateGreens, numSegments) as any);

      // const colorScale = d3.scaleSequential(
      //   [minAttributeValue, maxAttributeValue],
      //   d3.interpolateGreens
      // );

      // Augmenting GeoJSON with aggregated data
      regions.features.forEach((feature: any) => {
        const regionData = aggregatedData.find(
          (d) => d.region === feature.properties.nom
        );
        feature.properties.value = regionData
          ? Number(regionData[selectedAttribute])
          : "NA";
      });

      // Map rendering logic...
      const svg = d3.select(mapRef.current);
      const projection = d3.geoConicConformal().fitSize([800, 600], regions);
      const pathGenerator = d3.geoPath().projection(projection);

      svg.selectAll(".region").remove(); // Clear previous paths

      svg
        .selectAll(".region")
        .data(regions.features)
        .enter()
        .append("path")
        .attr("class", "region")
        .attr("d", (d: any) => pathGenerator(d) as string)
        .attr("fill", (d: any) => colorScale(d.properties.value));
    }
  }, [regions, aggregatedData, selectedAttribute, aggregatedData2007, aggregatedData2022]);

  // Copy color scale for Legend
  const maxAttributeValue = Math.max(
    ...aggregatedData2022.map((d) => Number(d[selectedAttribute]))
  );
  const minAttributeValue = Math.min(
    ...aggregatedData2007.map((d) => Number(d[selectedAttribute]))
  );

  const numSegments = 20;

  const colorScale = d3
    .scaleQuantize()
    .domain([minAttributeValue, maxAttributeValue])
    .range(d3.quantize(d3.interpolateGreens, numSegments) as any);


  // const colorScale = d3.scaleSequential(
  //   [minAttributeValue, maxAttributeValue],
  //   d3.interpolateGreens
  // );

  return (
    <div className="flex flex-col w-[800px] items-start">
      <div className="flex">
        <select
          value={selectedAttribute}
          onChange={(e: any) => setSelectedAttribute(e.target.value)}
        >
          <option value="nbExpSum">Nombre d&apos;exploitations engagées</option>
          <option value="surfabSum">Surface Bio à terme (ha)</option>
          <option value="surfc1Sum">Surface Bio 1ère année (ha) </option>
          <option value="surfc2Sum">Surface Bio 2ème année (ha)</option>
          <option value="surfc3Sum">Surface Bio 3ème année (ha)</option>
          <option value="surfc123Sum">Surface Bio en conversion (ha)</option>
          <option value="surfbioSum">Surface Bio engagée (ha)</option>
          {/* Add other options here */}
        </select>
      </div>

      <div className="flex flex-grow">
        <svg ref={mapRef} width={800} height={600}></svg>
      </div>
      <div className="flex flex-col items-center w-full border px-6 py-4 bg-slate-50">
        <span>
          <h2 className="text-lg mb-4 ">Légende</h2>
        </span>
        {colorScale ? (
          <Legend colorScale={colorScale} />
        ) : (
          <p>Loading colorScale....</p>
        )}
      </div>
    </div>
  );
};

export default FranceMap;
