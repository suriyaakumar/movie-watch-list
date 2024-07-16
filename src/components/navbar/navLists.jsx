import { Command } from 'cmdk';
import { Plus, ListHeart } from '@phosphor-icons/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavWatchLists = ({ currentUser, createWatchlist }) => (
	<>
		<div className='flex items-center justify-between w-11/12 mx-auto'>
			<h2 className='tracking-tight text-xl font-semibold text-red-600'>
				Your Watchlists
			</h2>
			{currentUser.watchlists && currentUser.watchlists.length > 0 && (
				<button onClick={() => createWatchlist()} className='p-2'>
					<Plus size={28} />
				</button>
			)}
		</div>
		{currentUser.watchlists && currentUser.watchlists.length > 0 ? (
			<div className='flex flex-col flex-grow justify-start space-y-2 overflow-y-auto'>
				<Command>
					<div className='mx-auto w-11/12'>
						<Command.Input
							placeholder='Search ...'
							className='p-1.5 mb-2 border-2 w-full focus:outline-none'
						/>
					</div>
					<Command.List>
						<Command.Empty className='w-11/12 mx-auto tracking-tight text-center text-md'>
							No watchlists found.
						</Command.Empty>
						{currentUser.watchlists.map((watchlist) => (
							<Command.Item
								key={watchlist?.id}
								className='block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100'
							>
								<Link
									to={`watchlist/${watchlist?.id}`}
									state={{ id: watchlist?.id }}
								>
									{watchlist?.name}
								</Link>
							</Command.Item>
						))}
					</Command.List>
				</Command>
			</div>
		) : (
			<div className='flex flex-col flex-1 items-center space-y-2'>
				<h4 className='font-semibold text-lg tracking-tight'>
					Create a watchlist
				</h4>
				<p className='tracking-tight'>Create your first watchlist</p>
				<button
					onClick={() => createWatchlist()}
					className='flex justify-center space-x-1.5 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
				>
					<ListHeart size={26} />
					<span>Create Watchlist</span>
				</button>
			</div>
		)}
	</>
);

NavWatchLists.propTypes = {
	currentUser: PropTypes.object,
	createWatchlist: PropTypes.func,
};

export default NavWatchLists;
