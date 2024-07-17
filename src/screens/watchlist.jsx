import { useEffect, useState, useContext } from 'react';
import { getWatchlist } from '../contexts/db';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { useRemoveMovie } from '../hooks/useRemoveMovie';
import Item from '../components/item';
import EditableInput from '../components/editableInput';
import { toast } from 'react-toastify';

export default function Watchlist() {
	const location = useLocation();
	const { id } = location.state;
	const { currentUser } = useContext(UserContext);
	const removeMovie = useRemoveMovie();

	const [watchlist, setWatchlist] = useState({});

	useEffect(() => {
		const fetchWatchlist = async () => {
			if (id) {
				const watchlist = await getWatchlist(id);
				setWatchlist(watchlist);
				document.title = `Watchlist | ${watchlist.name}`;
			}
		};
		fetchWatchlist();
	}, [id]);

	const deleteMovie = async (movie) => {
		try {
			setWatchlist(watchlist.movies.filter((m) => m.id !== movie.id));
			await removeMovie(id, movie);
			toast.success('Movie deleted successfully');
		} catch (error) {
			toast.error(error.message);
			console.error(error);
		}
	};

	return (
		<div className='mx-auto mt-10 space-y-5'>
			<EditableInput
				className={'font-black text-3xl'}
				initialValue={watchlist?.name}
			/>
			<EditableInput
				className={'font-bold text-base'}
				initialValue={watchlist?.description}
				placeholder={'Add a description'}
			/>

			{watchlist.movies && watchlist.movies.length > 0 ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
					{watchlist.movies.map((movie) => (
						<Item
							key={movie?.imdbID}
							movie={movie}
							currentUser={currentUser}
							deleteMovie={deleteMovie}
						/>
					))}
				</div>
			) : (
				<div className='flex flex-col items-center justify-center'>
					<h1 className='font-black text-3xl'>No Movies</h1>
				</div>
			)}
		</div>
	);
}
