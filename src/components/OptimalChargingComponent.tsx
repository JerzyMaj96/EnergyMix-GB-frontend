import { useState } from "react";
import {
  baseUrl,
  type OptimalChargingWindow,
} from "../utils/backend-data-types";
import OptimalChargingWindowTable from "./OptimalChargingWindowTable";

function OptimalChargingComponent() {
  const [hours, setHours] = useState<number | string>("");
  const [error, setError] = useState<Error | null>(null);
  const [optimalWindow, setOptimalWindow] =
    useState<OptimalChargingWindow | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setHours(Number(event.target.value));
  }

  async function getOptimalChargingWindow(event: React.FormEvent) {
    event.preventDefault();
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
  }

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="text-red-500 mb-2 font-bold">
          Error: {error.message}
        </div>
      )}
      <form
        onSubmit={getOptimalChargingWindow}
        className="flex gap-4 items-center"
      >
        <input
          type="number"
          placeholder="type hours (1-6)"
          value={hours}
          onChange={handleChange}
          className="border p2 rounded w-64"
          min="1"
          max="6"
          disabled={loading}
        />
        <button
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Loading..." : "Get Optimal Charging Window (1-6 hours)"}
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
