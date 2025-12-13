import { useState } from "react";
import type { OptimalChargingWindow } from "../utils/backend-data-types";
import OptimalChargingWindowTable from "./OptimalChargingWindowTable";

function OptimalChargingComponent() {
  const [hours, setHours] = useState<number | string>("");
  const [error, setError] = useState<Error | null>(null);
  const [optimalWindow, setOptimalWindow] =
    useState<OptimalChargingWindow | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setHours(Number(event.target.value));
  }

  async function getOptimalChargingWindow(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setOptimalWindow(null);

    if (!hours) return;

    try {
      const response = await fetch(
        `http://localhost:8080/energy-mix/optimal-charging-window?windowLength=${hours}`
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
    }
  }

  return !optimalWindow ? (
    <form
      onSubmit={getOptimalChargingWindow}
      className="flex gap-4 items-center"
    >
      {error && (
        <div className="text-red-500 mb-2 font-bold">
          Error: {error.message}
        </div>
      )}
      <input
        type="number"
        placeholder="type hours (1-6)"
        value={hours}
        onChange={handleChange}
        className="border p2 rounded w-64"
        min="1"
        max="6"
      />
      <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Get Optimal Charging Window (1-6 hours)
      </button>
    </form>
  ) : (
    <OptimalChargingWindowTable data={optimalWindow} />
  );
}

export default OptimalChargingComponent;
