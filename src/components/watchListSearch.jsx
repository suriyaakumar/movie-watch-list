import { Command } from 'cmdk';
import { Plus } from '@phosphor-icons/react';
import { useCreateWatchlist } from '../hooks/useCreateWatchList';
import PropTypes from 'prop-types';
import { useAddMovie } from '../hooks/useAddMovie';

export default function WatchListSearch({ currentUser, movie }) {
	const createWatchlist = useCreateWatchlist();
    const addMovie = useAddMovie();
    

	return (
		<Command>
			<Command.Input
				placeholder='Search ...'
				className='block px-4 py-2 focus:outline-none'
			/>
			<button
				onClick={() => createWatchlist(movie)}
				className='flex items-center w-full space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
			>
				<Plus size={28} /> <span>New watchlist</span>
			</button>
			<Command.List className='overflow-y-auto h-28 xl:h-40'>
				<Command.Empty className='w-11/12 mx-auto p-2 text-center tracking-tight'>
					No watchlists found.
				</Command.Empty>
				{currentUser.watchlists &&
					currentUser.watchlists.length > 0 &&
					currentUser.watchlists.map((watchlist) => (
						<Command.Item
							onSelect={() => addMovie(watchlist?.id, movie)}
							key={watchlist?.id}
							className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
						>
							{watchlist?.name}
						</Command.Item>
					))}
			</Command.List>
		</Command>
	);
}

WatchListSearch.propTypes = {
	currentUser: PropTypes.object,
	movie: PropTypes.object,
};
