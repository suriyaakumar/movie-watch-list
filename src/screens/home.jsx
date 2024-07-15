import { useState, useEffect } from 'react';
import Item from '../components/item';

export default function Home() {
    useEffect(() => {
        document.title = 'Watchlists | Search';
    }, []);
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const search = async () => {
			let results = await fetch(
				`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${query}&plot="short"`
			);
			results = await results.json();
			setMovies(results);
		};

    return (
			<div className='mx-auto'>
				<div className='flex flex-col p-5 space-y-5 justify-center'>
					<div className='flex space-x-2 justify-center'>
						<input
							onChange={(e) => setQuery(e.target.value)}
							value={query}
							type='text'
							placeholder='Search for movies & series'
							className='flex-1 py-2 px-3 rounded border-2 focus:outline-none'
						/>
						<button
							onClick={search}
							className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
						>
							Search
						</button>
					</div>
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
									plot={movie.Plot}
								/>
							))}
					</div>
				</div>
			</div>
		);
}