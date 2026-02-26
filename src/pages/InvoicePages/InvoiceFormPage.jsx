import React from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import InvoiceForm from '../../components/InventoryManagement/InvoiceManagement/InvoiceForm'

function InvoiceFormPage() {
  return (
    <>
    <div className='flex bg-[#f5f7fa]'>
    <SideBar/>
    <div className='w-full'>
    <NavBar/>
    <InvoiceForm/>
    </div>
    </div>
    </>
  )
}

export default InvoiceFormPage
