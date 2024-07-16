import { useContext, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../contexts/userContext';

export const useCreateWatchlist = () => {
	const { currentUser, updateUser } = useContext(UserContext);

	const createWatchlist = useCallback(
		async (movie) => {
			const id = uuidv4();
			const name = `New Watchlist ${currentUser.watchlists.length + 1}`;
			const watchlist = {
				user: currentUser.email,
				name,
			};
			if (movie) watchlist.movies = [movie];

			const updatedUser = { ...currentUser };
			updatedUser.watchlists.push({ id, name });
			updateUser(updatedUser);

		},
		[currentUser, updateUser]
	);

	return createWatchlist;
};
