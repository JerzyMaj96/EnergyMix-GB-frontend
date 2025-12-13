import type { Props } from "../utils/table-helper";
import { formatDateTime } from "../utils/table-helper";

function OptimalChargingWindowTable({ data }: Props) {
  return (
    <div className="w-full mt-4 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-extrabold text-gray-800">
          Optimal Charging Window Table
        </h2>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Start time
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                End time
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Clean Energy Percentage (Avg)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-blue-50 transition duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {formatDateTime(data.startingDateTime)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {formatDateTime(data.endingDateTime)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {`${data.averageCleanEnergyPercent.toFixed(2)}%`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OptimalChargingWindowTable;
