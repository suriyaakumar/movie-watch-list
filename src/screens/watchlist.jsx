import { useEffect, useState, useContext } from 'react';
import { getWatchlist } from '../contexts/db';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { useRemoveMovie } from '../hooks/useRemoveMovie';
import GridItem from '../components/gridItem';
import EditableInput from '../components/editableInput';
import { toast } from 'react-toastify';
import { Check, FilmSlate, Trash } from '@phosphor-icons/react';
import WatchListSearch from '../components/watchListSearch';
import { useAddMovie } from '../hooks/useAddMovie';

export default function Watchlist() {
	const location = useLocation();
	const navigate = useNavigate();
	const { id } = location.state;
	const { currentUser } = useContext(UserContext);
	const removeMovie = useRemoveMovie();
	const addMovie = useAddMovie();
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
			const newMovies = watchlist.movies.filter((m) => m.Title !== movie.Title || m.imdbID !== movie.imdbID);
			setWatchlist({
				...watchlist,
				movies: newMovies,
			});
			await removeMovie(id, movie);
			toast.success('Movie deleted successfully');
		} catch (error) {
			toast.error(error.message);
			console.error(error);
		}
	};

	return (
		<div className='mx-auto space-y-3'>
			<div className='space-y-1'>
				<EditableInput
					className={'font-black text-xl md:text-3xl text-center lg:text-left'}
					initialValue={watchlist?.name}
				/>
				<EditableInput
					className={'font-bold text-sm md:text-base text-center lg:text-left'}
					initialValue={watchlist?.description}
					placeholder={'Add a description'}
				/>
			</div>
			{watchlist.movies && watchlist.movies.length > 0 ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
					{watchlist.movies.map((movie) => (
						<GridItem
							key={movie?.imdbID}
							movie={movie}
							Actions={() => (
								<div className='flex items-center space-x-1'>
									<button className='inline-flex rounded p-1.5 bg-red-600 hover:bg-red-600 text-white font-bold'>
										<Check className='h-5 w-5' />{' '}
									</button>
									<WatchListSearch
										currentUser={currentUser}
										movie={movie}
										onSelect={addMovie}
									/>
									<button
										onClick={() => deleteMovie(movie)}
										className='inline-flex rounded p-1.5 bg-red-600 hover:bg-red-600 text-white font-bold'
									>
										<Trash className='h-5 w-5' />
									</button>
								</div>
							)}
						/>
					))}
				</div>
			) : (
				<div className='w-11/12 md:w-2/3 border border-gray-600 rounded-lg flex flex-col space-y-2 items-center p-2 mx-auto'>
					<FilmSlate className='w-36 h-36' />
					<h1 className='font-black text-3xl'>No Movies</h1>
					<button onClick={() => navigate('/home')} className='p-2 bg-red-600 text-white rounded-lg hover:bg-red-700'>
						Add Movies
					</button>
				</div>
			)}
		</div>
	);
}
