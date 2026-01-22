import React from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import StockForm from '../../components/InventoryManagement/StockManagement/StockForm'

function StockFormPage() {
  return (
    <>
    <div className='flex bg-[#f5f7fa]'>
    <SideBar/>
    <div className='w-full'>
    <NavBar/>
    <StockForm/>
    </div>
    </div>
    </>
  )
}

export default StockFormPage
