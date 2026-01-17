import React from 'react'
import Transaction from './components/Transaction'
import Dashboard from './components/SideBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ExpenseList from './pages/ExpenseList'
import AddExpense from '../src/pages/AddExpense'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/expense" element={<ExpenseList/>}/>
      <Route path="/expense/add" element={<AddExpense/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App