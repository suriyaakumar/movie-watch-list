import { useContext, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../contexts/userContext';
import DatabaseContext from '../contexts/dbContext';
import { setWatchlist } from '../contexts/db';

export const useCreateWatchlist = () => {
	const { setUser } = useContext(DatabaseContext);
	const { currentUser, updateUser } = useContext(UserContext);

	const createWatchlist = useCallback(
		async (movie) => {
			const id = uuidv4();
			const name = `New Watchlist ${currentUser.watchlists.length + 1}`;
			const watchlist = {
				name,
				description: ""
			};
			if (movie) watchlist.movies = [movie];

			const updatedUser = { ...currentUser };
			updatedUser.watchlists.push({ id, name });
			await setUser(currentUser.email, updatedUser);
			updateUser(updatedUser);

			await setWatchlist(id, watchlist);
		},
		[currentUser, setUser, updateUser]
	);

	return createWatchlist;
};
