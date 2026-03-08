import React from 'react'
import { FaMoneyBillWave, FaFileInvoiceDollar, FaCreditCard, FaMoneyCheck } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { HiOutlineBuildingOffice, HiOutlineCube } from 'react-icons/hi2';
import { MdDashboard, MdInventory2, MdPointOfSale } from 'react-icons/md';
import { Link } from 'react-router-dom';

function SideBar() {
  return (
    <aside className="bg-gradient-to-r from-blue-400 to-blue-600 w-64 text-white p-4 h-screen">
      <h2 className="text-2xl font-bold mb-6">DashBoard</h2>
      <ul className="space-y-4">
        {/* <Link to="/expense" className="flex items-center gap-2 my-text-lg">
          <FaCreditCard size={20} /> Expense
        </Link> */}
        {/* <Link to="/income" className="flex items-center gap-2">
          <FaMoneyBillWave /> Income
        </Link> */}
        <Link to="/dashboard" className="flex items-center gap-2 my-text-lg">
          <MdDashboard size={20} /> Dashboard
        </Link>
        <Link to="/branch" className="flex items-center gap-2 my-text-lg">
          <HiOutlineBuildingOffice size={20} /> Branch
        </Link>
        <Link to="/product" className="flex items-center gap-2 my-text-lg">
          <HiOutlineCube size={20} /> Product
        </Link>
        <Link to="/stock" className="flex items-center gap-2 my-text-lg">
          <MdInventory2 size={20} /> Stock
        </Link>
        <Link to="/purchase/all" className="flex items-center gap-2 my-text-lg">
          <FiShoppingCart size={20} /> Purchase
        </Link>
        <Link to="/sale/all" className="flex items-center gap-2 my-text-lg">
          <MdPointOfSale size={20} /> Sale
        </Link>
        <Link to="/invoice/all" className="flex items-center gap-2 my-text-lg">
          <FaFileInvoiceDollar size={20} /> Invoice
        </Link>
      </ul>
    </aside>
  );
}

export default SideBar;
