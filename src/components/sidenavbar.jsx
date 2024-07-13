import { useState } from 'react';
import { Link } from "react-router-dom";
import { House, DotsThree, Plus } from "@phosphor-icons/react";

export default function SideNavBar() {
    const [sideBarQuery, setSideBarQuery] = useState();

    return (
        <nav className='space-y-4'>
            <input className="p-1.5 mb-3 w-full border-2 focus:outline-none" type="text" value={sideBarQuery} onChange={(e) => setSideBarQuery(e.target.value)} placeholder="Search" />
            <Link className="p-2 flex items-center space-x-5" to="/home"><House className="h-6 w-6" /> <span className="text-xl">Home</span></Link>
            <hr className='border-t-1 border-gray-400' />
            <div className="flex items-center justify-between">
                <h2 className="tracking-tight font-semibold text-2xl">My Lists</h2>
                <button><Plus size={28} /></button>
            </div>
            <div className="flex">
                <div className="flex-grow p-4">

                </div>
            </div>
            <div className="p-3 w-full flex items-center justify-between">
                <img className="rounded h-full bg-red-600" src=""></img>
                <span>{localStorage.getItem('user')}</span>
                <button><DotsThree size={28} /></button>
            </div>
        </nav>
    );
};