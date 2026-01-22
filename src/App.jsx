import React from 'react'
import Transaction from './components/Transaction'
import Dashboard from './components/SideBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ExpenseList from './pages/ExpenseList'
import AddExpense from '../src/pages/AddExpense'
import BranchListPage from './pages/BranchPages/BranchListPage'
import BranchFormPage from './pages/BranchPages/BranchFormPage'
import ProductListPage from './pages/ProductPages/ProductListPage'
import ProductFormPage from './pages/ProductPages/ProductFormPage'
import StockFormPage from './pages/StockPages/StockFormPage'
import StockListPage from './pages/StockPages/StockListPage'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/expense" element={<ExpenseList/>}/>
      <Route path="/expense/add" element={<AddExpense/>}/>
      <Route path="/branch" element={<BranchListPage/>}/>
      <Route path="/branch/add" element={<BranchFormPage/>}/>
      <Route path="/product" element={<ProductListPage/>}/>
      <Route path="/product/add" element={<ProductFormPage/>}/>
      <Route path="/stock" element={<StockListPage/>}/>
      <Route path="/stock/add" element={<StockFormPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App