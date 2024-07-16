import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { House, User, Plus, ListHeart, SignOut } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { setWatchlist } from '../contexts/db';
import { Command } from 'cmdk';

export default function NavBar({ menuOpen, setMenuOpen }) {
	const navigate = useNavigate();
	const { currentUser, updateUser } = useContext(UserContext);

	const createWatchlist = async (movie) => {
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
	};

	return (
		<nav className='flex flex-col flex-1 overflow-y-auto pb-4 space-y-3'>
			<div className='w-11/12 mx-auto space-y-0.5'>
				<Link className='p-2 flex items-center space-x-4' to='/home'>
					<House className='h-5 w-5' />
					<span className='text-lg tracking-tight'>Home</span>
				</Link>
				<Link className='p-2 flex items-center space-x-4' to='/profile'>
					<User className='h-5 w-5' />
					<span className='text-lg tracking-tight'>Profile</span>
				</Link>
				<Link className='p-2 flex items-center space-x-4' to='/watchlists'>
					<ListHeart className='h-5 w-5' />
					<span className='text-lg tracking-tight'>Watchlists</span>
				</Link>
				<Link
					className='p-2 flex items-center space-x-4 text-red-600'
					onClick={() => {
						localStorage.removeItem('user');
						updateUser(null);
						navigate('/');
					}}
				>
					<SignOut className='h-6 w-6' />
					<span className='text-lg tracking-tight'>Logout</span>
				</Link>
			</div>
			<hr className='border-t-1 w-11/12 mx-auto border-gray-400' />
			<div className='flex items-center justify-between w-11/12 mx-auto'>
				<h2 className='tracking-tight text-xl font-semibold text-red-600'>
					Your Watchlists
				</h2>
				{currentUser.watchlists && currentUser.watchlists.length > 0 && (
					<button onClick={createWatchlist} className='p-2'>
						<Plus size={28} />
					</button>
				)}
			</div>
			{currentUser.watchlists && currentUser.watchlists.length > 0 ? (
				<div className='flex flex-col flex-grow justify-start space-y-2 overflow-y-auto'>
					<Command>
						<div className='mx-auto w-11/12'>
							<Command.Input
								placeholder='Search ...'
								className='p-1.5 mb-2 border-2 w-full focus:outline-none'
							/>
						</div>
						<Command.List>
							<Command.Empty className='w-11/12 mx-auto tracking-tight text-center text-md'>
								No watchlists found.
							</Command.Empty>
							{currentUser.watchlists.map((watchlist) => (
								<Command.Item
									key={watchlist?.id}
									className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
								>
									<Link to={`list/${watchlist?.id}`}>{watchlist?.name}</Link>
								</Command.Item>
							))}
						</Command.List>
					</Command>
				</div>
			) : (
				<div className='flex flex-col flex-1 items-center space-y-2'>
					<h4 className='font-semibold text-lg tracking-tight'>
						Create a watchlist
					</h4>
					<p className='tracking-tight'>Create your first watchlist</p>
					<button
						onClick={createWatchlist}
						className='flex justify-center space-x-1.5 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
					>
						<ListHeart size={26} />
						<span>Create Watchlist</span>
					</button>
				</div>
			)}
		</nav>
	);
}

NavBar.propTypes = {
	menuOpen: PropTypes.bool.isRequired,
	setMenuOpen: PropTypes.func.isRequired,
};
