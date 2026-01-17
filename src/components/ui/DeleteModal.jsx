import React from 'react'
import { CgDanger } from "react-icons/cg";
import { TiDelete } from "react-icons/ti";

function DeleteModal({onCancel,id,onDelete}) {
  function handleDelete(){
    onDelete(id)
    onCancel()
  }
  return (

    <div className='bg-white rounded-xl p-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <div className='flex justify-end'>
            <TiDelete onClick={onCancel} className='text-4xl cursor-pointer'/>
            </div>
        <div className='flex flex-col justify-center items-center'>
        <CgDanger className='text-8xl text-red-500'/>
        <h2 className='text-2xl font-700'> Delete</h2>
        <p className='text-lg'>Are you sure you want to delete this data from your list.</p> 
            <p className='text-lg'>If you delete this data it will deleted permanently.</p>
        </div>
        <div className='grid grid-cols-2 gap-4 my-4'>
            <button onClick={onCancel}
            className='rounded-xl bg-red-500 hover:bg-red-700 p-4'>Cancel</button>
            <button onClick={handleDelete}
            className='rounded-xl bg-gray-500 hover:bg-gray-700 p-4'>Delete</button>
        </div>
    </div>
  )
}

export default DeleteModal