/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { DailyEnergySummary } from "../utils/backend-data-types";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getFuelColor } from "../utils/forecast-helpper";

function ForecastComponent() {
  const [dailySummaries, setDailySummaries] = useState<DailyEnergySummary[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:8080/energy-mix/three-days-summary")
      .then((response) => response.json())
      .then((data) => setDailySummaries(data))
      .catch((error) => console.error("Error fetching the data", error))
      .finally(() => setLoading(false));
  }, []);

  const prepareChartData = (fuelMap: Record<string, number>) => {
    if (!fuelMap) return [];
    return Object.keys(fuelMap).map((key) => ({
      name: key,
      value: fuelMap[key],
      fill: getFuelColor(key),
    }));
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="mb-12 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 pl-4 border-l-8 border-blue-600">
        Forecast for the next 3 days:
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {dailySummaries.map((day, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center w-full md:w-[350px]"
          >
            <h3 className="text-center font-bold text-xl mb-2 text-gray-700">
              Date: {day.date.substring(0, 10)}
            </h3>

            <div className="text-center mb-8">
              <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full">
                Clean Energy Percentage:{" "}
                {day.cleanEnergyPercent ? day.cleanEnergyPercent.toFixed(1) : 0}
                %
              </span>
            </div>

            <div className="flex justify-center items-center">
              <PieChart width={250} height={250}>
                <Pie
                  data={prepareChartData(day.fuelSpec)}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  label={({ percent }: any) => {
                    if (percent * 100 < 1) return null;
                    return `${(percent * 100).toFixed(0)}%`;
                  }}
                >
                  {prepareChartData(day.fuelSpec).map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${value.toFixed(2)}%`}
                />
                <Legend />
              </PieChart>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastComponent;
