import React from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import ProductForm from '../../components/InventoryManagement/ProductManagement/ProductForm'

function ProductFormPage() {
  return (
    <>
    <div className='flex bg-[#f5f7fa]'>
    <SideBar/>
    <div className='w-full'>
    <NavBar/>
    <ProductForm/>
    </div>
    </div>
    </>
  )
}

export default ProductFormPage
