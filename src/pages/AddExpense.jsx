import React from 'react'
import Dashboard from '../components/SideBar'
import Transaction from '../components/Transaction'
import NavBar from '../components/NavBar'

function AddExpense() {
  return (
    <>
    <div className='flex bg-[#f5f7fa]'>
    <Dashboard/>
    <div className='w-full'>
    <NavBar/>
    <Transaction/>
    </div>
    </div>
    </>
  )
}

export default AddExpense
