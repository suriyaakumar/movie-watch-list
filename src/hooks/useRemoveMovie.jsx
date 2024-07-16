import { useContext, useCallback } from 'react';
import DatabaseContext from '../contexts/dbContext';

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
