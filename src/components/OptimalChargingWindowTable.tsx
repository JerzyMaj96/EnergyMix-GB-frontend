import type { Props } from "../utils/table-helper";

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
              <th>Clean Energy Average</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.startingDateTime}</td>
              <td>{data.endingDateTime}</td>
              <td>{data.averageCleanEnergyPercent}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OptimalChargingWindowTable;
