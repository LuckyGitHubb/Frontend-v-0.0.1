import React from 'react'
import { FaBoxOpen, FaCodeBranch, FaShoppingCart, FaWarehouse } from 'react-icons/fa'

function DashboardCards({counts}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="dashboard-card">
          <div className="icon-wrapper bg-blue-100 text-blue-600">
            <FaCodeBranch size={22} />
          </div>
          <div>
            <p className="card-title">Branches</p>
            <h2 className="card-value">{counts?.branches || 0}</h2>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="icon-wrapper bg-green-100 text-green-600">
            <FaBoxOpen size={22} />
          </div>
          <div>
            <p className="card-title">Products</p>
            <h2 className="card-value">{counts?.products || 0}</h2>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="icon-wrapper bg-purple-100 text-purple-600">
            <FaWarehouse size={22} />
          </div>
          <div>
            <p className="card-title">Stock</p>
            <h2 className="card-value">{counts?.stocks || 0}</h2>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="icon-wrapper bg-orange-100 text-orange-600">
            <FaShoppingCart size={22} />
          </div>
          <div>
            <p className="card-title">Sales</p>
            <h2 className="card-value">{counts?.sales || 0}</h2>
          </div>
        </div>

      </div>
  )
}

export default DashboardCards