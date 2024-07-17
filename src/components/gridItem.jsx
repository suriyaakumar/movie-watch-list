import PropTypes from 'prop-types';
import {
	CalendarBlank,
	Bookmark,
	Plus,
	Star,
	Trash,
} from '@phosphor-icons/react';
import { Command } from 'cmdk';
import { useCreateWatchlist } from '../hooks/useCreateWatchList';
import { useAddMovie } from '../hooks/useAddMovie';
import * as Popover from '@radix-ui/react-popover';

function GridItem({ movie, currentUser, deleteMovie }) {
	const createWatchlist = useCreateWatchlist();
	const addMovie = useAddMovie();

	return (
		<div className='rounded h-5/6 overflow-hidden space-y-1.5 shadow-md hover:shadow-lg hover:border-1 hover:transition-shadow hover:ease-in-out'>
			<img className='w-full h-3/6 object-cover' src={movie.Poster} />
			<div className='space-y-2 px-2'>
				<div className='flex justify-between gap-x-2 items-start'>
					<div className='font-bold text-md lg:text-xl'>{movie?.Title}</div>
					<div className='space-x-1.5'>
						<Popover.Root>
							<Popover.Trigger className='inline-flex rounded px-3 py-2 bg-red-600 hover:bg-red-600 text-white font-bold'>
								<Bookmark className='h-5 w-5' />
							</Popover.Trigger>
							<Popover.Portal>
								<Popover.Content className='bg-white rounded shadow-2xl border-2 mt-2'>
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
								</Popover.Content>
							</Popover.Portal>
						</Popover.Root>
						{deleteMovie && (
							<button
								onClick={() => deleteMovie(movie)}
								className='inline-flex rounded px-3 py-2 bg-red-600 hover:bg-red-600 text-white font-bold'
							>
								<Trash className='h-5 w-5' />
							</button>
						)}
					</div>
				</div>
				<div className='flex items-center space-x-3'>
					<p className='flex items-center space-x-1.5'>
						<CalendarBlank className='h-6 w-6' />
						<span className='text-base md:text-base lg:text-md'>
							{movie?.Year}
						</span>
					</p>
					<p className='flex items-center space-x-1.5'>
						<Star className='h-6 w-6' />
						<span className='text-base md:text-base lg:text-md'>
							{movie?.Metascore}
						</span>
					</p>
				</div>
				{movie?.Plot && <p>{movie?.Plot}</p>}
			</div>
		</div>
	);
}

GridItem.propTypes = {
	movie: PropTypes.object.isRequired,
	currentUser: PropTypes.object.isRequired,
	deleteMovie: PropTypes.func,
};

export default GridItem;
