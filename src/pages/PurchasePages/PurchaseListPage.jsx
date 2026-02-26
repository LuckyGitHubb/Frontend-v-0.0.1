import React from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import PurchaseList from '../../components/InventoryManagement/PurchaseManagement/PurchaseList'

function PurchaseListPage() {
  return (
    <>
    <div className='flex bg-[#f5f7fa]'>
    <SideBar/>
    <div className='w-full'>
    <NavBar/>
    <PurchaseList/>
    </div>
    </div>
    </>
  )
}

export default PurchaseListPage
