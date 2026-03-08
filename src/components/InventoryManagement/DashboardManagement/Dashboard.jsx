import React, { useState, useEffect } from "react";
import { FaCodeBranch, FaBoxOpen, FaWarehouse, FaShoppingCart } from "react-icons/fa";
import { Dashboard_API } from "../../../services/apiRoutes";
import { globalApi } from "../../../services/apiClient";
import { CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import useDashboardStats from "../../../hooks/dashboard/useDashboardStats";
import InvoiceDonut from "./charts/InvoiceDonut";
import SalesLine from "./charts/SalesLine";
import DashboardCards from "./cards/DashboardCards";
import StockStatusPie from "./charts/StockStatusPie";

function Dashboard() {
    const currentYear = new Date().getFullYear();
    const [selectedYear,setSelectedYear] = useState(currentYear)
    const {counts,invoicePaymentStats,monthlySalesStats,stockStatusStats,loading,error} = useDashboardStats({year:selectedYear});

  const formattedData = invoicePaymentStats.map((item=> ({
    name:item?._id,
    value:item?.totalAmount,
    counts:item?.count
  })))

  return (
    <div className="px-6 py-6 space-y-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of system statistics
        </p>
      </div>

      {/* Cards Section */}
      <DashboardCards counts={counts}/>

      {/* Charts Section */}
      <SalesLine
      selectedYear={selectedYear}
      setSelectedYear={setSelectedYear}
      currentYear={currentYear}
      data={monthlySalesStats}
      />
      

      <div className="grid grid-cols-2 gap-4">        
      <InvoiceDonut formattedData={formattedData}/>
      <StockStatusPie stockStatusStats={stockStatusStats}/>

      </div>
      

    </div>
  );
}

export default Dashboard;