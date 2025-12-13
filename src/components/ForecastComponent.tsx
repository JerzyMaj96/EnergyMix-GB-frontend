import { useEffect, useState } from "react";
import type { DailyEnergySummary } from "../types";
// import { PieChart, Pie, ResponsiveContainer } from "recharts";

// const COLORS = [
//   "#106bbcff",
//   "#23ac93ff",
//   "#FFBB28",
//   "#e4550dff",
//   "#4d49a2ff",
//   "#03bd4bff",
// ];

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

  //   const prepareChartData = (fuelMap: Record<string, number>) => {
  //     return Object.keys(fuelMap).map((key) => ({
  //       name: key,
  //       value: fuelMap[key],
  //     }));
  //   };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mb-12 max-w-7xl mx-auto">
      <h2>Forecast for the next 3 days:</h2>
      <div>
        {dailySummaries.map((day, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
          >
            <h3 className="text-2xl font-bold mb-4">
              {day.date.substring(0, 10)}
            </h3>
            <div className="text-center mb-4">
              <span>
                Clean Energy Percentage:{" "}
                {day.cleanEnergyPercent ? day.cleanEnergyPercent.toFixed(2) : 0}
                %
              </span>
            </div>

            {/* WYKRES */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastComponent;
