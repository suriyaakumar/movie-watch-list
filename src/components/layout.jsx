import { useState, useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { List, X } from '@phosphor-icons/react';
import NavBar from './navbar';
import DatabaseContext from '../db/dbContext';

export default function Layout() {
	const [menuOpen, setMenuOpen] = useState(false);
	const handlers = useSwipeable({
		onSwipedLeft: () => setMenuOpen(!menuOpen),
		onSwipedRight: () => setMenuOpen(!menuOpen),
		trackMouse: true,
		preventDefaultTouchmoveEvent: true,
	});
	const [currentUser, setCurrentUser] = useState({});
	const { getUser } = useContext(DatabaseContext);

	useEffect(() => {
		const fetchUser = async () => {
			const user = await getUser(localStorage.getItem('user'));
			setCurrentUser(user);
		};
		fetchUser();
	}, [getUser]);

	return (
		<div className='flex'>
			<div
				{...handlers}
				className={`fixed inset-y-0 left-0 w-full sm:w-5/12 lg:w-2/12 bg-white transform ${menuOpen ? 'translate-x-0 border-1 shadow-lg' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
			>
				<div className='h-full flex flex-col space-y-4 p-4'>
					<div className='flex justify-between'>
						<h1 className='tracking-tight text-2xl text-red-500 lg:text-3xl font-bold'>
							Watchlists
						</h1>
						<button
							className='lg:hidden'
							onClick={() => setMenuOpen(!menuOpen)}
						>
							<X size={28} />
						</button>
					</div>
					<NavBar user={currentUser} />
				</div>
			</div>

			<main className='flex-1 p-4 ml-0 lg:ml-64 transition-all duration-300 ease-in-out'>
				<button
					className='lg:hidden p-1 bg-red-600 text-white'
					onClick={() => setMenuOpen(!menuOpen)}
				>
					<List size={28} />
				</button>
				<Outlet />
			</main>
		</div>
	);
}
