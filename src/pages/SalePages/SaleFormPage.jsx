import React from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import SaleForm from '../../components/InventoryManagement/SaleManagement/SaleForm'

function SaleFormPage() {
  return (
    <>
    <div className='flex bg-[#f5f7fa]'>
    <SideBar/>
    <div className='w-full'>
    <NavBar/>
    <SaleForm/>
    </div>
    </div>
    </>
  )
}

export default SaleFormPage
