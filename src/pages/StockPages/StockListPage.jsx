import React from 'react'
import NavBar from '../../components/NavBar'
import StockList from '../../components/InventoryManagement/StockManagement/StockList'
import SideBar from '../../components/SideBar'

function StockListPage() {
  return (
    <>
    <div className='flex'>
    <SideBar/>
    <div className='w-full'>
    <NavBar/>
    <StockList/>
    </div>
    </div>
    </>
  )
}

export default StockListPage
