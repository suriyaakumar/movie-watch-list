import { useContext, useCallback } from 'react';
import DatabaseContext from '../contexts/dbContext';

export const useAddMovie = () => {
	const { getWatchlist, setWatchlist } = useContext(DatabaseContext);

	const addMovie = useCallback(
		async (id, movie) => {
			const watchlist = await getWatchlist(id);
			const newMovie = { ...movie, watched: false };
			watchlist.movies && watchlist.movies.length > 0
				? watchlist.movies.push(newMovie)
				: (watchlist.movies = [newMovie]);
			await setWatchlist(id, watchlist);
		},
		[setWatchlist, getWatchlist]
	);

	return addMovie;
};
