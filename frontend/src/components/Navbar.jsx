import React from 'react'
import {useAuthStore} from '../store/useAuthStore'
const Navbar = () => {

    const {logout,authUser} = useAuthStore()

  return (
    <header className='bg-base-100 b'>
        <div>

        </div>
    </header>
  )
}

export default Navbar