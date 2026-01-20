import React from 'react'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import ProductList from '../../components/InventoryManagement/ProductManagement/ProductList'

function ProductListPage() {
  return (
    <>
    <div className='flex'>
    <SideBar/>
    <div className='w-full'>
    <NavBar/>
    <ProductList/>
    </div>
    </div>
    </>
  )
}

export default ProductListPage
