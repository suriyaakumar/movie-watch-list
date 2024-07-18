import { useContext, useCallback } from 'react';
import { UserContext } from '../contexts/userContext';
import DatabaseContext from '../contexts/dbContext';

/**
 * Custom hook that deletes a watchlist and updates the user's watchlists.
 *
 * @return {Function} A function that deletes a watchlist and updates the user's watchlists.
 */
export const useDeleteWatchlist = () => {
	const { setUser, deleteWatchlist } = useContext(DatabaseContext);
	const { currentUser, updateUser } = useContext(UserContext);

	const removeWatchlist = useCallback(
		async (id) => {
			const updatedUser = { ...currentUser };
			updatedUser.watchlists = updatedUser.watchlists.filter(
				(watchlist) => watchlist.id !== id
			);
			await setUser(currentUser.email, updatedUser);
			updateUser(updatedUser);

			deleteWatchlist(id);
		},
		[currentUser, setUser, updateUser, deleteWatchlist]
	);

	return removeWatchlist;
};
