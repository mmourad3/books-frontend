import React from 'react'
import { FaBook } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-gray-100'>
      <div className="flex items-center min-h-[5rem] gap-4">
        <NavLink className="ml-24" to="/">
          <FaBook className="text-2xl" />
        </NavLink>
        <div className="flex items-center ml-auto mr-20 gap-20">
          <NavLink className="hover:border-b border-gray-600" to="/">
            Home
          </NavLink>
          <NavLink className="hover:border-b border-gray-600" to="/books/add-book">
            Add a Book
          </NavLink>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar