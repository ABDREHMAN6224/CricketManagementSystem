import React from 'react'
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { TooltipContent } from './ScatterChart'

const BarChartComp = ({data}) => {
  return (
    <ResponsiveContainer width={500} height={400}>
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
        <YAxis dataKey={"economy"}/>
        <Legend/>
        <Tooltip content={<TooltipContent/>}/>
        <Area type="monotone" dataKey="economy" name="Innings Vs Economy" stroke="#0a4722" fill="#198c4e" />


      </AreaChart>
    </ResponsiveContainer>
    )  
}

export default BarChartComp