import PropTypes from 'prop-types';
import { CalendarBlank, Star, FilmSlate } from '@phosphor-icons/react';

function GridItem({ movie, Actions }) {
	
	return (
		<div className='flex flex-col rounded space-y-1.5 shadow-md hover:shadow-lg hover:border-1 hover:transition-shadow hover:ease-in-out'>
			<div className='w-full h-3/6 bg-gray-200 overflow-hidden'>
				{movie && movie.Poster !== 'N/A' ? (
					<img
						className='h-full w-full aspect-auto object-cover'
						src={movie.Poster}
					/>
				) : (
					<FilmSlate className='h-full w-full font-medium' />
				)}
			</div>
			<div className='flex flex-col flex-1 space-y-2 px-2'>
				<div className='flex justify-between gap-x-2 items-start'>
					<div className='font-bold text-md lg:text-xl'>{movie?.Title}</div>
					{Actions && <Actions />}
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
			</div>
		</div>
	);
}

GridItem.propTypes = {
	movie: PropTypes.object.isRequired,
	Actions: PropTypes.func,
};

export default GridItem;
