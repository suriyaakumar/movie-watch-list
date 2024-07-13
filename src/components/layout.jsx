import { Outlet } from "react-router-dom";
import PropTypes from 'prop-types';
import { useState } from 'react';
import { List, X } from "@phosphor-icons/react";
import SideNavBar from "./sidenavbar";

export default function Layout({ watchlists }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen">
            <div className="hidden lg:block lg:w-2/12 py-5 px-3 pb">
                <SideNavBar lists={watchlists} />
            </div>
            <div className="w-full lg:w-10/12">
                <button onClick={() => { setMenuOpen(!menuOpen); }} className={`lg:hidden ${menuOpen ? 'hidden' : 'block'} m-2 p-1 border-2 flex items-center`}><List size={28} /></button>
                <div className={`fixed transform bg-white border-1 shadow-xl transition-transform duration-1000 ease-in-out ${menuOpen ? 'block translate-x-0' : 'hidden -translate-x-full'} w-4/12 h-screen px-3 z-40`}>
                    <button onClick={() => { setMenuOpen(!menuOpen); }} className={`lg:hidden m-2 p-1`}><X size={24} /></button>
                    <SideNavBar lists={watchlists} />
                </div>
                <Outlet />
            </div>
        </div>
    )
}

Layout.propTypes = {
    watchlists: PropTypes.array
}