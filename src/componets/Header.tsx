import React from 'react'
import { BiMessage } from 'react-icons/bi'

export default function Header() {
  return (
    <nav>
      <div className='flex justify-between items-center container mx-auto'>
        <div>
          <BiMessage />
          <p>Chatty</p>
        </div>
        <div>
          right
        </div>
      </div>
    </nav>
  )
}
