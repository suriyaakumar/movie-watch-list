import { useState, useEffect, useContext } from 'react';
import Item from '../components/item';
import { UserContext } from '../contexts/userContext';
import { toast } from 'react-toastify';
import Search from '../components/search';

export default function Home() {
	useEffect(() => {
		document.title = 'Watchlists | Home';
	}, []);
	const [movies, setMovies] = useState([]);
	const { currentUser } = useContext(UserContext);

	const search = async (query) => {
		try {
			let results = await fetch(
				`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${query}&type=movie&page=1`
			);
			results = await results.json();

			if (results.Search) {
				const promises = results.Search.map(async (movie) => {
					const result = await fetch(
						`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&t=${movie.Title}&plot=short`
					);
					return result.json();
				});
				const detailedResults = await Promise.all(promises);
				setMovies(detailedResults);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className='mx-auto'>
			<div className='flex flex-col p-5 space-y-5 justify-center'>
				<h1 className='text-3xl font-black'>Search</h1>
				<Search onSearch={search} />
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
					{movies.length > 0 &&
						movies.map((movie) => (
							<Item
								key={movie.imdbID}
								movie={movie}
								currentUser={currentUser}
							/>
						))}
				</div>
			</div>
		</div>
	);
}
