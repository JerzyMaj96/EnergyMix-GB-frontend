/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { DailyEnergySummary } from "../types";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#106bbcff",
  "#23ac93ff",
  "#FFBB28",
  "#e4550dff",
  "#4d49a2ff",
  "#03bd4bff",
];

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
    }));
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="mb-12 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 pl-4 border-l-8 border-blue-600">
        Forecast for the next 3 days:
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {dailySummaries.map((day, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col"
          >
            <h3 className="text-center font-bold text-xl mb-2 text-gray-700">
              {day.date.substring(0, 10)}
            </h3>

            <div className="text-center mb-4">
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
                  outerRadius={80}
                  label={({ percent }: any) => `${(percent * 100).toFixed(0)}%`}
                >
                  {prepareChartData(day.fuelSpec).map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={COLORS[idx % COLORS.length]}
                    />
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
