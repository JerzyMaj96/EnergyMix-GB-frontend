import ForecastComponent from "./ForecastComponent";
import OptimalChargingComponent from "./OptimalChargingComponent";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-gray-800">
      <header className="text-4xl font-extrabold text-blue-900 mb-2">
        <h1>Energy Mix</h1>
      </header>
      <ForecastComponent />
      <OptimalChargingComponent />
    </div>
  );
}

export default App;
