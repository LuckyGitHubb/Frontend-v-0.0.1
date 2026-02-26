import React from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import SaleList from '../../components/InventoryManagement/SaleManagement/SaleList'

function SaleListPage() {
  return (
    <>
    <div className='flex bg-[#f5f7fa]'>
    <SideBar/>
    <div className='w-full'>
    <NavBar/>
    <SaleList/>
    </div>
    </div>
    </>
  )
}

export default SaleListPage
