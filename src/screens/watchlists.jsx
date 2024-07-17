import { useEffect, useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import { useDeleteWatchlist } from '../hooks/useDeleteWatchList';
import WatchListItem from '../components/watchListItem';
import { Plus } from '@phosphor-icons/react';
import { useCreateWatchlist } from '../hooks/useCreateWatchList';

export default function Watchlists() {
	useEffect(() => {
		document.title = 'Watchlists | Watchlists';
	}, []);
	const deleteWatchlist = useDeleteWatchlist();
	const { currentUser } = useContext(UserContext);
	const createWatchlist = useCreateWatchlist();

	return (
		<div className='mx-auto mt-10 space-y-5'>
			<div className='flex justify-between items-center'>
				<h1 className='font-black text-3xl'>Your Watchlists</h1>
				<button onClick={() => createWatchlist()} className='flex items-center space-x-2 p-2 text-white bg-red-600 hover:bg-red-700 rounded'>
					<Plus className='h-5 w-5'/>
					<span className='hidden md:block'>New Watchlist</span>
				</button>
			</div>
			{currentUser.watchlists && currentUser.watchlists.length > 0 ? (
				<div className='space-y-0.5'>
					{currentUser.watchlists.map((watchlist) => (
						<WatchListItem
							key={watchlist?.id}
							id={watchlist?.id}
							name={watchlist?.name}
							handleAction={deleteWatchlist}
						/>
					))}
				</div>
			) : (
				<div className='flex flex-col items-center justify-center'>
					<h1 className='font-black text-3xl'>No Watchlists</h1>
				</div>
			)}
		</div>
	);
}
