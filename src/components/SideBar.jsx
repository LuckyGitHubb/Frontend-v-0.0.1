import React from 'react'
import { FaMoneyBillWave, FaFileInvoiceDollar, FaCreditCard, FaMoneyCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 w-64 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">DashBoard</h2>
      <ul className="space-y-4">
        <Link to="/expense" className="flex items-center gap-2">
          <FaCreditCard /> Expense
        </Link>
        <Link to="/income" className="flex items-center gap-2">
          <FaMoneyBillWave /> Income
        </Link>
        <Link to="/invoice" className="flex items-center gap-2">
          <FaFileInvoiceDollar /> Invoice
        </Link>
        <Link to="/payments" className="flex items-center gap-2">
          <FaMoneyCheck /> Payments
        </Link>
      </ul>
    </div>
  );
}

export default SideBar;
