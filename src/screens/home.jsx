import { useState, useEffect, useContext } from 'react';
import Item from '../components/item';
import { UserContext } from '../contexts/userContext';
import { toast } from 'react-toastify';
import Search from '../components/search';
import { CaretRight, CaretLeft } from '@phosphor-icons/react';

export default function Home() {
	useEffect(() => {
		document.title = 'Watchlists | Home';
	}, []);
	const [movies, setMovies] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentQuery, setCurrentQuery] = useState('');
	const [totalResults, setTotalResults] = useState(0);
	const { currentUser } = useContext(UserContext);

	const search = async (query, page = 1) => {
		try {
			let results = await fetch(
				`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${query}&type=movie&page=${page}`
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
				setTotalResults(results.totalResults);
				setCurrentPage(page);
			}
		} catch (error) {
			toast.error(error.message);
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
		<div className='mx-auto'>
			<div className='flex flex-col p-5 space-y-5 justify-center'>
				<h1 className='text-3xl font-black'>Search</h1>
				<Search onSearch={handleSearch} />
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-2'>
					{movies.length > 0 &&
						movies.map((movie) => (
							<Item
								key={movie.imdbID}
								movie={movie}
								currentUser={currentUser}
							/>
						))}
				</div>
				{totalResults > 10 && <div className='flex justify-between'>
					<button
						className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
						onClick={handlePreviousPage}
						disabled={currentPage === 1}
					>
						<CaretLeft />
					</button>
					<button
						className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
						onClick={handleNextPage}
						disabled={currentPage * 10 >= totalResults}
					>
						<CaretRight />
					</button>
				</div>}
			</div>
		</div>
	);
}
