import { useState, useEffect, useContext, Suspense, lazy } from 'react';
import { UserContext } from '../contexts/userContext';
import { toast } from 'react-toastify';
import Search from '../components/search';
import { useAddMovie } from '../hooks/useAddMovie';


const MoviesList = lazy(() => import('../components/moviesList'));

export default function Home() {
	useEffect(() => {
		document.title = 'Watchlists | Home';
	}, []);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentQuery, setCurrentQuery] = useState('');
	const [totalResults, setTotalResults] = useState(0);
	const { currentUser } = useContext(UserContext);
	const addMovie = useAddMovie();

	const search = async (query, page = 1) => {
		try {
			let results = await fetch(
				`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${query}&type=movie&page=${page}`
			);
			results = await results.json();

			if (results.Search) {
				return {
					movies: results.Search,
					totalResults: results.totalResults,
				};	
			}
			
		} catch (error) {
			toast.error(error.message);
			return { movies: [], totalResults: 0 };
		}
	};

	const handleSearch = (query) => {
		setCurrentQuery(query);
		setCurrentPage(1);
		search(query, 1);
	};

	const handleNextPage = () => {
		if (currentPage * 10 < totalResults) {
			search(currentQuery, currentPage + 1);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			search(currentQuery, currentPage - 1);
		}
	};

	return (
		<div className='mx-auto space-y-3'>
			<h1 className='text-3xl font-black text-center md:text-left'>Search</h1>
			<Search onSearch={handleSearch} />
			<Suspense
				fallback={
					<div className='h-screen bg-red-600 text-center flex items-center'>
						Loading...
					</div>
				}
			>
				<MoviesList
					currentPage={currentPage}
					currentQuery={currentQuery}
					setTotalResults={setTotalResults}
					onSearch={search}
					totalResults={totalResults}
					currentUser={currentUser}
					addMovie={addMovie}
					handleNextPage={handleNextPage}
					handlePreviousPage={handlePreviousPage}
				/>
			</Suspense>
		</div>
	);
}
