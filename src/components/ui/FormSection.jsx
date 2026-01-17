import React from 'react'

function FormSection({children}) {
  return (
    <div className='p-4 bg-white rounded-xl'>
        {children}
    </div>
  )
}

export default FormSection