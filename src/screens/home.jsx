import { useState, useEffect, useContext, Suspense, lazy } from 'react';
import { UserContext } from '../contexts/userContext';
import { toast } from 'react-toastify';
import Search from '../components/search';
import { useAddMovie } from '../hooks/useAddMovie';


const MoviesList = lazy(() => import('../components/moviesList'));


/**
 * Asynchronous function to search for movies based on a query and page number.
 *
 * @param {string} query - The search query for movies.
 * @param {number} [page=1] - The page number for pagination.
 * @return {Object} An object with movies array and totalResults count.
 */
export default function Home() {
	useEffect(() => {
		document.title = 'Watchlists | Home';
	}, []);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentQuery, setCurrentQuery] = useState('');
	const [totalResults, setTotalResults] = useState(0);
	const { currentUser } = useContext(UserContext);
	const addMovie = useAddMovie();

	/**
	 * Asynchronously searches for movies based on a query and page number.
	 *
	 * @param {string} query - The search query for movies.
	 * @param {number} [page=1] - The page number for pagination.
	 * @return {Promise<Object>} An object with movies array and totalResults count.
	 */
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

	/**
	 * A function that handles the search by setting the current query, current page to 1, and performing a search operation.
	 *
	 * @param {type} query - The search query to be used in the search operation.
	 * @return {type} No explicit return value.
	 */
	const handleSearch = (query) => {
		setCurrentQuery(query);
		setCurrentPage(1);
		search(query, 1);
	};

	/**
	 * Handles the next page of search results.
	 *
	 * @return {void}
	 */
	const handleNextPage = () => {
		if (currentPage * 10 < totalResults) {
			setCurrentPage(currentPage + 1);
		}
	};

	/**
	 * Handles the previous page of search results.
	 *
	 * @param {type} paramName - description of parameter
	 * @return {type} description of return value
	 */
	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<div className='mx-auto space-y-3'>
			<h1 className='text-3xl font-black text-center md:text-left'>Search</h1>
			<Search onSearch={handleSearch} />
			<Suspense
				fallback={
					<div className='h-screen text-center flex items-center'>
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
