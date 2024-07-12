import { useState, useEffect } from 'react';
import Movie from './movie';

export default function Home() {
    useEffect(() => {
        document.title = 'Watchlists | Search';
    }, []);
    const [query, setQuery] = useState();
    const [movies, setMovies] = useState([]);

    const handleSubmit = async () => {
        let results = await fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${query}`);
        results = await results.json();
        setMovies(results);
    };

    return (
        <div className='mx-auto'>
            <div className='flex flex-col p-5 space-y-5 justify-center'>
                <div className='flex space-x-2 justify-center'>
                    <input onChange={(e) => setQuery(e.target.value)} value={query} type='text' placeholder='Search for movies & series' className='flex-1 py-2 px-3 rounded' />
                    <button onClick={handleSubmit} className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Search</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies && movies.Search && movies.Search.map((movie) => (
                    <Movie key={movie.imdbID} image={movie.Poster} title={movie.Title} year={movie.Year} type={movie.Type} />
                ))}
                </div>
            </div>
        </div>
    );
}