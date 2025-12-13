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
