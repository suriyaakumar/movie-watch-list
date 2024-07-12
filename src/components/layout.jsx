import { Outlet } from "react-router-dom";
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { House } from "@phosphor-icons/react";

const SideNavBar = () => {
    const [sideBarQuery, setSideBarQuery] = useState();

    return (
        <>
            <div className="space-y-5">
                <input className="p-1.5 w-full" type="text" value={sideBarQuery} onChange={(e) => setSideBarQuery(e.target.value)} placeholder="Search" />
                <Link className="p-2 flex items-center space-x-5" to="/home"><House className="h-6 w-6" /> <span className="text-xl">Home</span></Link>
                <h2 className="tracking-tight text-center font-bold lg:text-3xl">My Lists</h2>
            </div>
        </>
    );
};

export default function Layout({ watchlists }) {
    return (
        <div className="flex min-h-screen">
            <div className="hidden lg:block lg:w-2/12 py-5 px-3 pb">
                <SideNavBar lists={watchlists} />
            </div>
            <div className="w-full lg:w-10/12">
                <Outlet />
            </div>
        </div>
    )
}

Layout.propTypes = {
    watchlists: PropTypes.array
}