import { useCallback, useState } from "react";
import ForecastComponent from "./ForecastComponent";
import OptimalChargingComponent from "./OptimalChargingComponent";

function App() {
  const [areChartsReady, setAreChartsReady] = useState<boolean>(false);

  const handleChartsReady = useCallback(() => {
    setAreChartsReady(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 to-emerald-600 p-6 md:p-12 font-sans text-gray-800">
      <header className="text-4xl font-extrabold text-blue-900 mb-2">
        <h1>Energy Mix</h1>
      </header>
      <ForecastComponent onLoaded={handleChartsReady} />
      {areChartsReady && (
        <OptimalChargingComponent isForecastReady={areChartsReady} />
      )}
    </div>
  );
}

export default App;
