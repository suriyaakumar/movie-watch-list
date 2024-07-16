import { useContext, useCallback } from 'react';
import DatabaseContext from '../contexts/dbContext';

export const useAddMovie = () => {
	const { getWatchlist, setWatchlist } = useContext(DatabaseContext);

	const addMovie = useCallback(
		async (id, movie) => {
			const watchlist = await getWatchlist(id);
			const newMovie = { ...movie, watched: false };
			if (
				watchlist.movies &&
				!watchlist.movies.some((movie) => movie.imdbID === newMovie.imdbID) // check if the movie is already in the watchlist
			)
			watchlist.movies.push(newMovie);
			await setWatchlist(id, watchlist);
		},
		[setWatchlist, getWatchlist]
	);

	return addMovie;
};
