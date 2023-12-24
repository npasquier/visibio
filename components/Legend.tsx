// const Legend = ({ colorScale }: any) => {
//   if (!colorScale) return null;

//   const legendItems = colorScale.ticks().map((value: any) => ({
//     value,
//     color: colorScale(value),
//   }));

 



//   return (
//     <div className="legend">
//       {legendItems.map((item: any, index: number) => (
//         <div key={index} className="legend-item">
//           <span style={{ backgroundColor: item.color }}></span>
//           <span>{item.value}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Legend;


import React from 'react';
import { interpolateGreens } from 'd3-scale-chromatic';

const Legend = ({ colorScale } : any) => {
  const minLabel = colorScale.domain()[0];
  const maxLabel = colorScale.domain()[1];

  return (
    <div className="relative w-full px-6">
      <div className="rounded overflow-hidden h-4" style={{
        background: `linear-gradient(to right, ${interpolateGreens(0)}, ${interpolateGreens(1)})`,
      }}></div>
      <div className="flex justify-between text-xs mt-2">
        <span>Min: {minLabel.toFixed(2)}</span>
        <span>Max: {maxLabel.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Legend;
