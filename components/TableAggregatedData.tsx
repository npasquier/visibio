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

const TableAggregatedData = ({
  aggregatedData,
}: {
  aggregatedData: AggregatedDataProps[];
}) => {
  return (
    <div className="max-xl:h-[40rem] h-[45rem] w-[45rem] overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Région
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Nombre d&apos;exploitations
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Surface Bio à terme (ha)
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Surface Bio 1ère année (ha)
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Surface Bio 2ème année (ha)
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Surface Bio 3ème année (ha)
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Surface Bio en conversion (ha)
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Surface Bio engagée (ha)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {aggregatedData.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{item.region}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.nbExpSum.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.surfabSum.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.surfc1Sum.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.surfc2Sum.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.surfc3Sum.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.surfc123Sum.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.surfbioSum.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAggregatedData;
