import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const TooltipContent = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="bg-white flex flex-col gap-1 p-2 border rounded">
        
        <p className="text-xs m-0 p-0 text-gray-600">{`Name: ${payload[0]?.payload?.name}`}</p>
        <p className="text-xs m-0 p-0 text-gray-600">{`Runs: ${payload[0]?.payload?.runs}`}</p>
        <p className="text-xs m-0 p-0 text-gray-600">{`Innings: ${payload[0]?.payload?.innings}`}</p>
      </div>
    );
  }
  return null;
};
const MatchTooltipContent = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="bg-white flex flex-col gap-1 p-2 border rounded">
        
        <p className="text-xs m-0 p-0 text-gray-600">{`Team: ${payload[0]?.payload?.name}`}</p>
        <p className="text-xs m-0 p-0 text-gray-600">{`Matches: ${payload[0]?.payload?.matches}`}</p>
        <p className="text-xs m-0 p-0 text-gray-600">{`Wins: ${payload[0]?.payload?.wins}`}</p>
      </div>
    );
  }
  return null;
};

const AreaChartComp = ({data,x="innings",y="runs",m=false,name="Innings Vs Runs",w=600,xdata="",h=true}) => {
  return (
    <ResponsiveContainer width={w} height={400}>
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
        <XAxis dataKey={xdata} display={h?"none":""} />
        <YAxis />
        <Legend/>
        {/* show info on tooltip when hovered on graph */}
        {m?<Tooltip content={<MatchTooltipContent/>}/>:<Tooltip content={<TooltipContent/>}/>}
        {/* show area chart with dataKey as runs and name and stroke and fill as #8884d8 */}
        <Area type="monotone" dataKey={y} name={name} stroke="#443dcf" fill="#444496" />


      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartComp