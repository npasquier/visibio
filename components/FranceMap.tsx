"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Legend from "./Legend";
import { AggregatedDataProps } from "@/interface/data";

const FranceMap = ({
  aggregatedData,
  aggregatedData2007,
  aggregatedData2022,
  passedAttribute,
}: {
  aggregatedData: AggregatedDataProps[];
  aggregatedData2007: AggregatedDataProps[];
  aggregatedData2022: AggregatedDataProps[];
  passedAttribute: keyof AggregatedDataProps;
}) => {
  const [regions, setRegions] = useState<any>(null);
  const mapRef = useRef(null);

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
        ...aggregatedData2022.map((d) => Number(d[passedAttribute]))
      );
      const minAttributeValue = Math.min(
        ...aggregatedData2007.map((d) => Number(d[passedAttribute]))
      );

      const colorScale = d3
        .scaleQuantize()
        .domain([minAttributeValue, maxAttributeValue])
        .range(d3.quantize(d3.interpolateGreens, numSegments) as any);

      // Augmenting GeoJSON with aggregated data
      regions.features.forEach((feature: any) => {
        const regionData = aggregatedData.find(
          (d) => d.region === feature.properties.nom
        );
        feature.properties.value = regionData
          ? Number(regionData[passedAttribute])
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
  }, [
    regions,
    aggregatedData,
    passedAttribute,
    aggregatedData2007,
    aggregatedData2022,
  ]);

  // Copy color scale for Legend
  const maxAttributeValue = Math.max(
    ...aggregatedData2022.map((d) => Number(d[passedAttribute]))
  );
  const minAttributeValue = Math.min(
    ...aggregatedData2007.map((d) => Number(d[passedAttribute]))
  );

  const numSegments = 20;

  const colorScale = d3
    .scaleQuantize()
    .domain([minAttributeValue, maxAttributeValue])
    .range(d3.quantize(d3.interpolateGreens, numSegments) as any);

  return (
    <div className="flex flex-col h-full max-2xl:scale-95">
      <div className="flex w-full 2xl:scale-95 scale-90">
        <svg ref={mapRef} width={800} height={600}></svg>
      </div>
      <div className="flex flex-col items-center w-full border px-6 py-4 bg-slate-50 max-2xl:-mt-12 max-2xl:scale-90">
        <span>
          <h2 className="text-lg max-2xl:mb-4 max-2xl:text-sm mb-4">Légende</h2>
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
