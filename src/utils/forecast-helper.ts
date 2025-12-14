const COLORS: Record<string, string> = {
  hydro: "#2a9d8f",
  other: "#862a9d",
  biomass: "#606c38",
  imports: "#e96a7f",
  gas: "#96551fff",
  solar: "#e7b551",
  coal: "#191d20",
  nuclear: "#4361ee",
  wind: "#a8dadc",
};

export const getFuelColor = (name: string): string => {
  const key = name.toLowerCase();
  if (key.includes("hydro") || key.includes("water")) return COLORS.hydro;
  if (key.includes("solar")) return COLORS.solar;
  if (key.includes("wind")) return COLORS.wind;
  if (key.includes("coal") || key.includes("lignite")) return COLORS.coal;
  if (key.includes("gas")) return COLORS.gas;
  if (key.includes("nuc") || key.includes("atom")) return COLORS.nuclear;
  if (key.includes("bio")) return COLORS.biomass;
  if (key.includes("import")) return COLORS.imports;
  return COLORS.other;
};

export interface ForecastProps {
  onLoaded: () => void;
}
