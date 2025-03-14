import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <div className='bg-slate-800 '>
            <div className=' mycontainer flex justify-between items-center h-12 max-w-7xl'>
                <div className="logo font-semibold text-2xl text-white ">
                    <span className='text-green-500 font-bold'>&lt;</span>pass
                    <span className='text-green-500 font-bold'>OP/&gt;</span>
                </div>
                <div>
                    <ul>
                        <li className=' flex gap-2 text-sm '>
                            <NavLink className={(e) => e.isActive ? "red hover:font-bold" : "hover:font-bold p-2 text-white"} to="/home">Home</NavLink>
                            <NavLink className={(e) => e.isActive ? "red hover:font-bold" : "hover:font-bold p-2 text-white"} to="/about">About</NavLink>
                            <NavLink className={(e) => { return e.isActive ? "red hover:font-bold" : "hover:font-bold p-2 text-white" }} to="/contact">Contact Us</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
