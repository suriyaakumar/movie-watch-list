import { useContext, useCallback } from 'react';
import { UserContext } from '../contexts/userContext';
import DatabaseContext from '../contexts/dbContext';
import { deleteWatchlist } from '../contexts/db';

export const useDeleteWatchlist = () => {
	const { setUser } = useContext(DatabaseContext);
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
		[currentUser, setUser, updateUser]
	);

	return removeWatchlist;
};
