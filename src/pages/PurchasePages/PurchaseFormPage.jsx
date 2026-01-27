import React from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import PurchaseForm from '../../components/InventoryManagement/PurchaseManagement/PurchaseForm'

function PurchaseFormPage() {
  return (
    <>
    <div className='flex bg-[#f5f7fa]'>
    <SideBar/>
    <div className='w-full'>
    <NavBar/>
    <PurchaseForm/>
    </div>
    </div>
    </>
  )
}

export default PurchaseFormPage
