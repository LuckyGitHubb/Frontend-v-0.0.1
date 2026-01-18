import React from 'react'
import BranchList from '../../components/InventoryManagement/BranchManagement/BranchList'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'

function BranchListPage() {
  return (
    <>
    <div className='flex'>
    <SideBar/>
    <div className='w-full'>
    <NavBar/>
    <BranchList/>
    </div>
    </div>
    </>
  )
}

export default BranchListPage
