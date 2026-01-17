import React from 'react'

function Section({children}) {
  return (
    <div className='p-4 bg-white rounded-xl flex justify-between items-center'>
        {children}
    </div>
  )
}

export default Section