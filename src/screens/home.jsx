import { useState, useEffect, useContext } from 'react';
import Item from '../components/item';
import { UserContext } from '../contexts/userContext';
import Search from '../components/search';

export default function Home() {
	useEffect(() => {
		document.title = 'Watchlists | Home';
	}, []);
	const [movies, setMovies] = useState([]);
	const { currentUser } = useContext(UserContext);

	const search = async (query) => {
		let results = await fetch(
			`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${query}&plot="short"`
		);
		results = await results.json();
		setMovies(results);
	};

	return (
		<div className='mx-auto'>
			<div className='flex flex-col p-5 space-y-5 justify-center'>
				<Search onSearch={search} />
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
					{movies &&
						movies.Search &&
						movies.Search.map((movie) => (
							<Item
								key={movie.imdbID}
								image={movie.Poster}
								title={movie.Title}
								year={movie.Year}
								type={movie.Type}
								currentUser={currentUser}
							/>
						))}
				</div>
			</div>
		</div>
	);
}
