 import React, { useState } from 'react'


function Item({ data }) {

  return (
    <div  className='shadow-md bg-white text-center'>
      <p className='text-2xl p-10'>{data.setup}</p>
      <p className='text-xl p-6 text-lime-800 italic'>{data.punchline}</p>
      
    </div>
  )
}

export default Item
