import { AggregatedDataProps } from "@/interface/data";



const TableAggregatedData = ({
  aggregatedData,
  attributeArray,
}: {
  aggregatedData: AggregatedDataProps[];
  attributeArray: { abrev: string; value: string }[];
}) => {


  return (
    <div className="max-xl:h-[40rem] h-[45rem] w-[45rem] overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
          <th
                key="region"
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Région
              </th>
            {attributeArray.map((item, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {item.value}
              </th>
            ))}

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {aggregatedData.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{item.region}</td>
              {attributeArray.map((attribute, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap">
                  {Number(item[attribute.abrev as keyof AggregatedDataProps]).toFixed(0)}
                </td>
              ))
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAggregatedData;
