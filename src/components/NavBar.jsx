import React from 'react'

function NavBar() {
  return (
    <div className='flex justify-end items-center w-full h-12 bg-gradient-to-r from-blue-400 to-blue-600 shadow-[0_2px_6px_rgba(0,0,0,0.2)]'>
        <span>Profile</span>
        <span>Admin</span>
    </div>
  )
}

export default NavBar