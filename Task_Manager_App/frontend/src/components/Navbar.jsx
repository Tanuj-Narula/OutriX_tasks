import React from "react";
import { logout } from "../redux/userSlice.js";
import { useDispatch } from "react-redux";
import { TbLogout2 } from "react-icons/tb";
import {useNavigate} from 'react-router-dom'


const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  
  const handleLogout = ()=>{
    dispatch(logout());
    navigate("/login")
  }
  return (
    <div className="flex fixed w-full justify-between items-center p-4 text-white bg-[#0b0b0e]">
      <span className="flex ">
        <h1 className="text-4xl font-bold">📋 Itask </h1>
        <p className="self-end">manage your daily tasks</p>
      </span>
      <button
        onClick={handleLogout}
        className="bg-[#535fa1] hover:cursor-pointer flex items-center gap-1 hover:scale-105 hover:font-semibold text-white px-3 py-1 rounded"
      >
        <TbLogout2 size={15} /> Logout
      </button>
    </div>
  );
};

export default Navbar;
