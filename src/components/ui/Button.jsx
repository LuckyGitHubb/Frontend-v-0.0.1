import React from 'react'

function Button({children,onClick}) {
  return (
    <button onClick={onClick}
        className='bg-gradient-to-r from-blue-400 to-blue-600 px-4 py-2 rounded-xl text-white text-lg'>
        {children}
    </button>

  )
}

export default Button