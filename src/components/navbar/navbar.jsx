import { useContext } from 'react';
import PropTypes from 'prop-types';
import NavLinks from './navLinks';
import { UserContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { useCreateWatchlist } from '../../hooks/useCreateWatchList';
import NavWatchLists from './navLists';

export default function NavBar({ menuOpen, setMenuOpen }) {
	const { currentUser, updateUser } = useContext(UserContext);
	const createWatchlist = useCreateWatchlist(setMenuOpen, menuOpen);

	return (
		<nav className='flex flex-col flex-1 overflow-y-auto pb-4 space-y-3'>
			<NavLinks updateUser={updateUser} navigate={useNavigate()} />
			<hr className='border-t-1 w-11/12 mx-auto border-gray-400' />
			<NavWatchLists
				currentUser={currentUser}
				createWatchlist={createWatchlist}
			/>
		</nav>
	);
}

NavBar.propTypes = {
	menuOpen: PropTypes.bool.isRequired,
	setMenuOpen: PropTypes.func.isRequired,
};
