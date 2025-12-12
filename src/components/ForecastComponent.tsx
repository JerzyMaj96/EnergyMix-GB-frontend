import { useEffect, useState } from "react";
import type { DailyEnergySummary } from "../types";

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
    return Object.keys(fuelMap).map((key) => ({
      name: key,
      value: fuelMap[key],
    }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Forecast for the next 3 days:</h2>
      <div></div>
    </div>
  );
}

export default ForecastComponent;
