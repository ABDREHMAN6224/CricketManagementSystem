import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

export const TooltipContent = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white flex flex-col gap-1 p-2 border rounded">
        
        <p className="text-xs m-0 p-0 text-gray-600">{`Name: ${payload[0].payload.name}`}</p>
        <p className="text-xs m-0 p-0 text-gray-600">{payload[0].payload?.economy?`Economy: ${(payload[0].payload?.economy/10).toFixed(2)}`:`Wickets: ${payload[0].payload?.wickets}`}</p>
        <p className="text-xs m-0 p-0 text-gray-600">{`Innings: ${payload[0].payload?.innings}`}</p>
      </div>
    );
  }
  return null;
};

const ScatterChartComp = ({data}) => {
  return (
    <ResponsiveContainer width={480} height={400}>
 <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        {/* show graph between innings and scores with name as scores vs innings along with labels for x and y axis */}
        <XAxis dataKey="innings" display={"none"} />
        <YAxis dataKey={"wickets"}/>
        <Legend/>
        <Tooltip content={<TooltipContent/>}/>
        <Area type="monotone" dataKey="wickets" name="Innings Vs Wickets" stroke="#f2360c" fill="#d62a2a" />


      </AreaChart>
    </ResponsiveContainer>
    )
}

export default ScatterChartComp
