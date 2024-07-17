import PropTypes from 'prop-types';
import { CalendarBlank, Bookmark, Star, Trash } from '@phosphor-icons/react';
import * as Popover from '@radix-ui/react-popover';
import WatchListSearch from './watchListSearch';

function GridItem({ movie, currentUser, deleteMovie }) {

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
									<WatchListSearch currentUser={currentUser} movie={movie} />
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
