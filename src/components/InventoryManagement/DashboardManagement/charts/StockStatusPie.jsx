import { RechartsDevtools } from '@recharts/devtools'
import React from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import StockLegend from './StockLegend';

function StockStatusPie({stockStatusStats}) {
    const STATUS_COLORS = {
    "High Stock": "#00c950",
    "Medium Stock": "#2b7fff",
    "Low Stock": "#f0b100",
    "Out of Stock": "#fb2c36",
  };
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-400">

        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
              data={stockStatusStats}
              dataKey='count'
              nameKey='_id'
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
              >
              {stockStatusStats.map((item,index)=> (
                <Cell key={index} fill={STATUS_COLORS[item._id]}/>
              ))}
              </Pie>
              <Tooltip />
                                      <Legend />
              <RechartsDevtools/>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <StockLegend/>
      </div>
  )
}

export default StockStatusPie