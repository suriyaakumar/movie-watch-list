import PropTypes from 'prop-types';
import { CalendarBlank, Bookmark, Star, Trash, FilmSlate } from '@phosphor-icons/react';
import * as Popover from '@radix-ui/react-popover';
import WatchListSearch from './watchListSearch';
import { useAddMovie } from '../hooks/useAddMovie';

function GridItem({ movie, currentUser, deleteMovie }) {
	const addMovie = useAddMovie();

	return (
		<div className='flex flex-col rounded space-y-1.5 shadow-md hover:shadow-lg hover:border-1 hover:transition-shadow hover:ease-in-out'>
			<div className='w-full h-3/6 bg-gray-200 overflow-hidden'>
				{movie && movie.Poster !== 'N/A' ? (
					<img
						className='h-full w-full aspect-auto object-cover'
						src={movie.Poster}
					/>
				) : (<FilmSlate className='h-full w-full font-medium'/>)}
			</div>
			<div className='flex-1 space-y-2 px-2'>
				<div className='flex justify-between gap-x-2 items-start'>
					<div className='font-bold text-md lg:text-xl'>{movie?.Title}</div>
					<div className='space-x-1.5'>
						<Popover.Root>
							<Popover.Trigger className='inline-flex rounded px-3 py-2 bg-red-600 hover:bg-red-600 text-white font-bold'>
								<Bookmark className='h-5 w-5' />
							</Popover.Trigger>
							<Popover.Portal>
								<Popover.Content className='bg-white rounded shadow-2xl border-2 mt-2'>
									<WatchListSearch
										currentUser={currentUser}
										movie={movie}
										onSelect={addMovie}
									/>
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
				{movie?.Plot && movie.Plot !== 'N/A' && <p>{movie?.Plot}</p>}
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
