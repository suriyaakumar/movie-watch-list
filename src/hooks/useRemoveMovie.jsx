import { useContext, useCallback } from 'react';
import DatabaseContext from '../contexts/dbContext';

/**
 * Returns a function that removes a movie from a user's watchlist.
 *
 * @param {string} id - The ID of the user's watchlist.
 * @param {object} movie - The movie object to be removed.
 * @return {Promise} A promise representing the removal of the movie from the watchlist.
 */
export const useRemoveMovie = () => {
	const { getWatchlist, setWatchlist } = useContext(DatabaseContext);

	const removeMovie = useCallback(
		async (id, movie) => {
			const watchlist = await getWatchlist(id);
			const updatedWatchlist = { ...watchlist };
            updatedWatchlist.movies = updatedWatchlist.movies.filter(
                (m) => m.imdbID !== movie.imdbID
            );
            await setWatchlist(id, updatedWatchlist);
		},
		[setWatchlist, getWatchlist]
	);

	return removeMovie;
};
