import React from 'react'
import Dashboard from '../components/SideBar'
import Transaction from '../components/Transaction'
import NavBar from '../components/NavBar'
import TransactionList from '../components/TransactionList'

function ExpenseList() {
  return (
    <>
    <div className='flex'>
    <Dashboard/>
    <div className='w-full'>
    <NavBar/>
    <TransactionList/>
    </div>
    </div>
    </>
  )
}

export default ExpenseList
