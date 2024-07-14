import { useState } from 'react';
import { Link } from 'react-router-dom';
import { House, Plus, ListHeart } from '@phosphor-icons/react';
import PropTypes from 'prop-types';

export default function NavBar({ user }) {
	const [sideBarQuery, setSideBarQuery] = useState();

	return (
		<nav className='flex flex-col flex-1 space-y-5'>
			<input
				className='p-1.5 mb-3 w-full border-2 focus:outline-none'
				type='text'
				value={sideBarQuery}
				onChange={(e) => setSideBarQuery(e.target.value)}
				placeholder='Search'
			/>
			<Link className='p-2 flex items-center space-x-4' to='/home'>
				<House className='h-5 w-5' />
				<span className='text-lg tracking-tight'>Home</span>
			</Link>
			<hr className='border-t-1 border-gray-400' />
			<div className='flex items-center justify-between'>
				<h2 className='tracking-tight text-xl font-semibold text-red-600'>
					Your Watchlists
				</h2>
				{user.watchlists && user.watchlists.length > 0 && (
					<button className='p-2'>
						<Plus size={28} />
					</button>
				)}
			</div>
			{user.watchlists && user.watchlists.length > 0 ? (
				user.watchlists.map((watchlist) => (
					<Link key={watchlist?.id}>{watchlist?.name}</Link>
				))
			) : (
				<div className='flex flex-col flex-1 items-center space-y-2'>
					<h4 className='font-semibold text-lg tracking-tight'>
						Create a watchlist
					</h4>
					<p className='tracking-tight'>Create your first watchlist</p>
					<button className='flex justify-center space-x-1.5 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
						<ListHeart size={26} />
						<span>Create Watchlist</span>
					</button>
				</div>
			)}
			<p>{user.email}</p>
		</nav>
	);
}

NavBar.propTypes = {
	user: PropTypes.object.isRequired,
};
