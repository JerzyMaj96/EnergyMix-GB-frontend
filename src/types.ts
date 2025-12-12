export interface DailyEnergySummary {
  date: string;
  averageCleanEnergyPercent: number;
  fuelPercentAverages: Record<string, number>;
}

export interface OptimalChargingWindow {
  startingDateTime: string;
  endingDateTime: string;
  averageCleanEnergyPercent: number;
}
