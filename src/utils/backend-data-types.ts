export interface DailyEnergySummary {
  date: string;
  cleanEnergyPercent: number;
  fuelSpec: Record<string, number>;
}

export interface OptimalChargingWindow {
  startingDateTime: string;
  endingDateTime: string;
  averageCleanEnergyPercent: number;
}

export const baseUrl =
  import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:8080";
