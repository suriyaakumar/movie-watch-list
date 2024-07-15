import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { List, X } from '@phosphor-icons/react';
import { UserProvider } from '../contexts/userContext';
import NavBar from './navbar';

export default function Layout() {
	const [menuOpen, setMenuOpen] = useState(false);
	const handlers = useSwipeable({
		onSwipedLeft: () => setMenuOpen(!menuOpen),
		onSwipedRight: () => setMenuOpen(!menuOpen),
		trackMouse: true,
		preventDefaultTouchmoveEvent: true,
	});

	return (
		<UserProvider>
			<div className='flex'>
				<div
					{...handlers}
					className={`fixed inset-y-0 left-0 w-full h-full sm:w-4/12 lg:w-3/12 xl:w-2/12 bg-white transform ${menuOpen ? 'translate-x-0 border-1 shadow-lg' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
				>
					<div className='h-full flex flex-col space-y-2'>
						<div className='flex justify-between p-4'>
							<h1 className='tracking-tight text-center text-2xl text-red-500 lg:text-3xl font-bold'>
								Watchlists
							</h1>
							<button
								className='lg:hidden'
								onClick={() => setMenuOpen(!menuOpen)}
							>
								<X size={28} />
							</button>
						</div>
						<NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
					</div>
				</div>
				<main className='flex-1 p-4 sm-ml-[calc(100vw/12*4)] lg:ml-[calc(100vw/12*3)] xl:ml-[calc(100vw/12*2)] transition-all duration-300 ease-in-out'>
					<button
						className='lg:hidden p-1 bg-red-600 text-white'
						onClick={() => setMenuOpen(!menuOpen)}
					>
						<List size={28} />
					</button>
					<Outlet />
				</main>
			</div>
		</UserProvider>
	);
}
