import { useState } from "react";

function OptimalChargingComponent() {
  const [hours, setHours] = useState<number | string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setHours(Number(event.target.value));
  }

  async function getOptimalChargingWindow(event: React.FormEvent) {
    event.preventDefault();

    if (!hours) return;

    try {
        const response = await fetch(`http://localhost:8080/optimal-charging-window?windowLength=${hours}`);

        if (!response.ok) {
    } catch (error) {

  }
  return (
    <form onSubmit={getOptimalChargingWindow}>
      <input
        type="number"
        placeholder="type hours (1-6)"
        value={hours}
        onChange={handleChange}
      ></input>
      <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Get Optimal Charging Window
      </button>
    </form>
  );
}

export default OptimalChargingComponent;
