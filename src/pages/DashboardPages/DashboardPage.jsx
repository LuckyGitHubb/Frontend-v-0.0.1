import React from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import Dashboard from '../../components/InventoryManagement/DashboardManagement/Dashboard'

function DashboardPage() {
  return (
    <>
    <div className='flex bg-[#f5f7fa] '>
    <SideBar/>
    <div className='w-full'>
    <NavBar/>
    <Dashboard/>
    </div>
    </div>
    </>
  )
}

export default DashboardPage
