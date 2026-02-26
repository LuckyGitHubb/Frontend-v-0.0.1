import React from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import InvoiceView from '../../components/InventoryManagement/InvoiceManagement/InvoiceView'

function InvoiceViewPage() {
  return (
    <>
    <div className='flex bg-[#f5f7fa]'>
    <SideBar/>
    <div className='w-full'>
    <NavBar/>
    <InvoiceView/>
    </div>
    </div>
    </>
  )
}

export default InvoiceViewPage
