import { RechartsDevtools } from '@recharts/devtools'
import React from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

function InvoiceDonut({ formattedData }) {
    const total = formattedData.reduce((acc, curr) => acc + curr.value, 0)
    const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-400">

            <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={formattedData}
                            dataKey='value'
                            nameKey='name'
                            innerRadius={70}
                            outerRadius={110}
                        >
                            {formattedData.map((item, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                        <RechartsDevtools />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center pointer-events-none">
                <div className="text-center">
                    <p className="text-gray-500 text-sm">Total</p>
                    <p className="text-xl font-bold">₹{total}</p>
                </div>
            </div>
        </div>
  )
}

export default InvoiceDonut