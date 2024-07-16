import { useContext, useCallback } from 'react';
import DatabaseContext from '../contexts/dbContext';

export const useAddMovie = () => {
    const { getWatchlist, setWatchlist } = useContext(DatabaseContext);
    
	const addMovie = useCallback(
		async (id, movie) => {
			const watchlist = await getWatchlist(id);
            watchlist.movies.push(movie);
			await setWatchlist(id, watchlist);
		},
		[setWatchlist, getWatchlist]
	);

	return addMovie;
};
