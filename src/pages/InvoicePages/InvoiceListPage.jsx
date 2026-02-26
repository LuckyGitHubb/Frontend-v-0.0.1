import React from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import InvoiceList from '../../components/InventoryManagement/InvoiceManagement/InvoiceList'

function InvoiceListPage() {
  return (
    <>
    <div className='flex bg-[#f5f7fa]'>
    <SideBar/>
    <div className='w-full'>
    <NavBar/>
    <InvoiceList/>
    </div>
    </div>
    </>
  )
}

export default InvoiceListPage
