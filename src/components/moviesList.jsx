import { useState, useEffect } from 'react';
import { CaretRight, CaretLeft } from '@phosphor-icons/react';
import GridItem from '../components/gridItem';
import WatchListSearch from '../components/watchListSearch';
import PropTypes from 'prop-types';

export default function MoviesList({
	currentPage,
	currentQuery,
	setTotalResults,
	onSearch,
	totalResults,
	currentUser,
	addMovie,
	handleNextPage,
	handlePreviousPage,
}) {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const fetchMovies = async () => {
			setMovies([]);
			const { movies, totalResults } = await onSearch(
				currentQuery,
				currentPage
			);
			setMovies(movies);
			setTotalResults(totalResults);
		};

		fetchMovies();
	}, [currentQuery, currentPage, onSearch, setTotalResults]);

	return (
		<div className='space-y-3'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
				{movies.length > 0 &&
					movies.map((movie) => (
						<GridItem
							key={movie.imdbID}
							movie={movie}
							Actions={() => (
								<WatchListSearch
									currentUser={currentUser}
									movie={movie}
									onSelect={addMovie}
								/>
							)}
						/>
					))}
			</div>
			{movies.length > 0 && totalResults > 10 && (
				<div className='flex justify-between'>
					<button
						className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
						onClick={handlePreviousPage}
						disabled={currentPage === 1}
					>
						<CaretLeft />
					</button>
					<button
						className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
						onClick={handleNextPage}
						disabled={currentPage * 10 >= totalResults}
					>
						<CaretRight />
					</button>
				</div>
			)}
		</div>
	);
}

MoviesList.propTypes = {
	currentPage: PropTypes.number,
	currentQuery: PropTypes.string,
	setTotalResults: PropTypes.func,
	onSearch: PropTypes.func,
	totalResults: PropTypes.number,
	currentUser: PropTypes.object,
	addMovie: PropTypes.func,
	handleNextPage: PropTypes.func,
	handlePreviousPage: PropTypes.func,
};
