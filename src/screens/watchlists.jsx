import { useEffect, useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import { useDeleteWatchlist } from '../hooks/useDeleteWatchList';
import WatchListItem from '../components/watchListItem';
import { ListStar, Plus } from '@phosphor-icons/react';
import { useCreateWatchlist } from '../hooks/useCreateWatchList';

export default function Watchlists() {
	useEffect(() => {
		document.title = 'Watchlists | Watchlists';
	}, []);
	const deleteWatchlist = useDeleteWatchlist();
	const { currentUser } = useContext(UserContext);
	const createWatchlist = useCreateWatchlist();

	return (
		<div className='mx-auto space-y-5'>
			<div className='flex justify-between items-center'>
				<h1 className='font-black text-3xl text-center lg:text-left'>Your Watchlists</h1>
				{currentUser.watchlists &&currentUser.watchlists.length > 0 && (
					<button
						onClick={() => createWatchlist()}
						className='flex items-center space-x-2 p-2 text-white bg-red-600 hover:bg-red-700 rounded'
					>
						<Plus className='h-5 w-5' />
						<span className='hidden md:block'>New Watchlist</span>
					</button>
				)}
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
				<div className='w-11/12 md:w-2/3 rounded-lg flex flex-col space-y-2 items-center p-2 mx-auto'>
					<ListStar className='w-36 h-36' />
					<h1 className='font-black text-3xl'>No Watchlists</h1>
					<button
						onClick={() => createWatchlist()}
						className='flex items-center space-x-2 p-2 text-white bg-red-600 hover:bg-red-700 rounded'
					>
						<Plus className='h-5 w-5' />
						<span>New Watchlist</span>
					</button>
				</div>
			)}
		</div>
	);
}
