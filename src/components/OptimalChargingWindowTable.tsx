import type { Props } from "../utils/table-helper";
import { formatDateTime } from "../utils/table-helper";

function OptimalChargingWindowTable({ data }: Props) {
  return (
    <div>
      <div>
        <h2>Optimal Charging Window Table</h2>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Start time</th>
              <th>End time</th>
              <th>Clean Energy Percentage (Avg)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formatDateTime(data.startingDateTime)}</td>
              <td>{formatDateTime(data.endingDateTime)}</td>
              <td>{data.averageCleanEnergyPercent.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OptimalChargingWindowTable;
