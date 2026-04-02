import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import type { Person } from "../data/family";
import { formatHeightData, quadraticRegression } from "../utils/family";

export function HeightChart({ person }: { person: Person }) {
  if (!person.heightData) return <p>No height data available.</p>;

  const actual = formatHeightData(person.heightData);
  if (actual.length < 3) return <p>Not enough height data to forecast.</p>;

  const predict = quadraticRegression(actual);

  const data: { age: number; actual?: number; forecast?: number }[] =
    actual.map(({ age, height }) => ({ age, actual: height }));

  for (const age of [15, 16, 17, 18]) {
    const predicted = Math.round(predict(age) * 10) / 10;
    const existing = data.find((d) => d.age === age);
    if (existing) {
      existing.forecast = predicted;
    } else {
      data.push({ age, forecast: predicted });
    }
  }

  const tickStyle = { fontFamily: "Poppins", fontSize: 12, fill: "#8F9591" };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ bottom: 22, right: 16 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#C8BFB5"
          vertical={false}
        />
        <XAxis
          dataKey="age"
          tick={tickStyle}
          axisLine={false}
          tickLine={false}
          label={{
            value: "Age",
            position: "insideBottomRight",
            offset: -8,
            style: tickStyle,
          }}
        />
        <YAxis
          domain={[40, 200]}
          tick={tickStyle}
          axisLine={false}
          tickLine={false}
          label={{
            value: "Height (cm)",
            angle: -90,
            position: "insideLeft",
            offset: 10,
            style: tickStyle,
          }}
        />
        <Tooltip
          contentStyle={{
            fontFamily: "Poppins",
            fontSize: 13,
            borderRadius: 8,
            border: "1px solid #E8E0D6",
            boxShadow: "0 4px 16px rgba(58,72,71,0.1)",
          }}
          formatter={(value, name) => [`${value} cm`, name]}
        />
        <Legend
          wrapperStyle={{ fontFamily: "Poppins", fontSize: 13, paddingTop: 12 }}
        />
        <ReferenceLine
          x={15}
          stroke="#AEB3B2"
          strokeDasharray="4 4"
          label={{
            value: "Forecast starts",
            position: "top",
            style: { fontFamily: "Poppins", fontSize: 11, fill: "#AEB3B2" },
          }}
        />
        <Line
          dataKey="actual"
          stroke="#3A4847"
          strokeWidth={2.5}
          dot={false}
          name="Actual"
          activeDot={{ r: 5, fill: "#3A4847" }}
        />
        <Line
          dataKey="forecast"
          stroke="#FA5C05"
          strokeWidth={2.5}
          strokeDasharray="6 4"
          dot={{ r: 4, fill: "#FA5C05", strokeWidth: 0 }}
          name="Forecast"
          connectNulls
          activeDot={{ r: 6, fill: "#FA5C05" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
