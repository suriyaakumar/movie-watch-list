import { useContext, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { setWatchlist } from '../contexts/db';

export const useCreateWatchlist = (setMenuOpen, menuOpen) => {
	const navigate = useNavigate();
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

			setMenuOpen(!menuOpen);
			await setWatchlist(id, watchlist);
			navigate(`list/${id}`);
		},
		[currentUser, menuOpen, navigate, setMenuOpen, updateUser]
	);

	return createWatchlist;
};
