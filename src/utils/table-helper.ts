import type { OptimalChargingWindow } from "./backend-data-types";

export interface Props {
  data: OptimalChargingWindow;
}

export const formatDateTime = (isoString: string) => {
  return new Date(isoString).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export interface OptimalWindowProps {
  isForecastReady: boolean;
}
