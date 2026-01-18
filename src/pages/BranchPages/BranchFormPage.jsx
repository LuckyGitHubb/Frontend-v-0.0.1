import React from 'react'
import BranchForm from '../../components/InventoryManagement/BranchManagement/BranchForm'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'

function BranchFormPage() {
  return (
    <>
    <div className='flex bg-[#f5f7fa]'>
    <SideBar/>
    <div className='w-full'>
    <NavBar/>
    <BranchForm/>
    </div>
    </div>
    </>
  )
}

export default BranchFormPage
