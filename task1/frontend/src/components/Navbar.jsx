import React, { useState } from 'react'
import { BsSearch } from "react-icons/bs"
import { MdFavorite } from "react-icons/md"
import { NavLink, useNavigate } from 'react-router-dom' // <-- import useNavigate
import '../App.css'

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search/${encodeURIComponent(searchTerm.trim())}`) 
      setSearchTerm("")
    }
  }

  return (
    <header className="pt-6 bg-gray-800 fixed text-white w-full h-auto font-serif z-50">
      <div className='flex items-center w-[98%] h-[50%] m-auto '>
        <div className='ml-10'>
          <NavLink to={"/"}>
            <h1 className="text-4xl font-bold font-[serif]">Shophoria</h1>
          </NavLink>
        </div>

        <div className='ml-44'>
          <form
            className="flex items-center w-[50vw]"
            onSubmit={(e) => { e.preventDefault(); handleSearch();  }}
          >
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 h-[42.6px] outline-none rounded-l-xl border-l border-b border-t text-white placeholder:text-gray-200 w-full bg-transparent"
            />
            <button
              type="submit"
              className="bg-[#eae4f0] text-white p-2 rounded-r-xl border-t border-r border-b cursor-pointer"
            >
              <BsSearch size={25} color='black' />
            </button>
          </form>
        </div>

      </div>

      {/* Navigation Links */}
      <div className='border-t mt-6 border-gray-500 px-4 w-full'>
        <ul className='flex justify-around mt-4 text-base w-full h-[5vh]'>
          <NavLink to={"/men clothing"} className={({ isActive }) => isActive ? "active-shadow px-2" : "text-gray-100 px-2"}>
            <li>Men Clothing</li>
          </NavLink>
          <NavLink to={"/women clothing"} className={({ isActive }) => isActive ? "active-shadow px-2" : "text-gray-100 px-2"}>
            <li>Women Clothing</li>
          </NavLink>
          <NavLink to={"/kids clothing"} className={({ isActive }) => isActive ? "active-shadow px-2" : "text-gray-100 px-2"}>
            <li>Kids Clothing</li>
          </NavLink>
          <NavLink to={"/footwear"} className={({ isActive }) => isActive ? "active-shadow px-2" : "text-gray-100 px-2"}>
            <li>Footwear</li>
          </NavLink>
          <NavLink to={"/beauty"} className={({ isActive }) => isActive ? "active-shadow px-2" : "text-gray-100 px-2"}>
            <li>Beauty</li>
          </NavLink>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
