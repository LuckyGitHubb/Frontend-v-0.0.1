import React from 'react'
import { FaMoneyBillWave, FaFileInvoiceDollar, FaCreditCard, FaMoneyCheck } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { HiOutlineBuildingOffice, HiOutlineCube } from 'react-icons/hi2';
import { MdInventory2, MdPointOfSale } from 'react-icons/md';
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
        <Link to="/payments" className="flex items-center gap-2">
          <FaMoneyCheck /> Payments
        </Link>
        <Link to="/branch" className="flex items-center gap-2">
          <HiOutlineBuildingOffice /> Branch
        </Link>
        <Link to="/product" className="flex items-center gap-2">
          <HiOutlineCube /> Product
        </Link>
        <Link to="/stock" className="flex items-center gap-2">
          <MdInventory2 /> Stock
        </Link>
        <Link to="/purchase/all" className="flex items-center gap-2">
          <FiShoppingCart /> Purchase
        </Link>
        <Link to="/sale/all" className="flex items-center gap-2">
          <MdPointOfSale /> Sale
        </Link>
        <Link to="/invoice/all" className="flex items-center gap-2">
          <FaFileInvoiceDollar /> Invoice
        </Link>
      </ul>
    </div>
  );
}

export default SideBar;
