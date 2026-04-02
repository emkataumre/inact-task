import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell, ResponsiveContainer } from "recharts";
import type { Person } from "../data/family";
import { collectPeople } from "../utils/family";

const COLORS = ["#3A4847", "#FA5C05", "#D4A456", "#8F9591", "#AEB3B2"];

export function AgeChart({ root }: { root: Person }) {
  const data = collectPeople(root);

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} barCategoryGap="30%">
        <CartesianGrid strokeDasharray="3 3" stroke="#C8BFB5" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontFamily: "Poppins", fontSize: 12, fill: "#8F9591" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontFamily: "Poppins", fontSize: 12, fill: "#8F9591" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            fontFamily: "Poppins",
            fontSize: 13,
            borderRadius: 8,
            border: "1px solid #E8E0D6",
            boxShadow: "0 4px 16px rgba(58,72,71,0.1)",
          }}
          cursor={{ fill: "rgba(249,242,235,0.8)" }}
        />
        <Bar dataKey="age" radius={[4, 4, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
