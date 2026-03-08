import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

function SalesLine({ setSelectedYear, selectedYear, currentYear, data }) {
    const years = new Array(31).fill(null)
    const handleChange = (e) => {
        setSelectedYear(e.target.value)
    }
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-400">
            <div className="flex justify-end mb-4">
                <select value={selectedYear}
                    onChange={handleChange}
                    className="border rounded-md px-2 py-1">
                    {years.map((_, index) => {
                        const year = currentYear - index
                        return (
                            <option value={year}>{year}</option>
                        )
                    })}
                </select>
            </div>


            <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="totalSales"
                            stroke="#8884d8"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default SalesLine