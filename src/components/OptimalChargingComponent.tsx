import { useState } from "react";
import {
  baseUrl,
  type OptimalChargingWindow,
} from "../utils/backend-data-types";
import OptimalChargingWindowTable from "./OptimalChargingWindowTable";
interface OptimalWindowProps {
  isForecastReady: boolean;
}

function OptimalChargingComponent({ isForecastReady }: OptimalWindowProps) {
  const [hours, setHours] = useState<number | string>("");
  const [error, setError] = useState<Error | null>(null);
  const [optimalWindow, setOptimalWindow] =
    useState<OptimalChargingWindow | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHours(Number(event.target.value));
  };

  const isBlocked = loading || !isForecastReady;

  const getOptimalChargingWindow = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isBlocked) return;
    setError(null);
    setOptimalWindow(null);

    if (!hours) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${baseUrl}/energy-mix/optimal-charging-window?windowLength=${hours}`
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      } else {
        const data = await response.json();
        setOptimalWindow(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("An unknown error occurred"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="text-red-500 mb-2 font-bold">
          Error: {error.message}
        </div>
      )}
      <form
        onSubmit={getOptimalChargingWindow}
        className="flex flex-col gap-6 items-center w-full"
      >
        <input
          type="number"
          placeholder="type hours (1-6)"
          value={hours}
          onChange={handleChange}
          className="border p-2 rounded-lg w-64 text-center shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          min="1"
          max="6"
          disabled={isBlocked}
        />
        <button
          disabled={isBlocked}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="font-bold text-lg">Calculating...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center leading-tight">
              <span className="font-bold text-lg">Find Best Charging Time</span>
              <span className="text-xs font-medium opacity-80 mt-1">
                (Forecast for the next 2 days)
              </span>
            </div>
          )}
        </button>
      </form>
      {optimalWindow && (
        <div className="mt-2">
          <OptimalChargingWindowTable data={optimalWindow} />
        </div>
      )}
    </div>
  );
}

export default OptimalChargingComponent;
