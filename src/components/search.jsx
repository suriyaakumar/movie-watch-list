import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Search({ onSearch }) {
	const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
	} 
	
	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			onSearch(query);
		}
	};

    return (
		<div className='flex space-x-2 justify-center'>
			<input
				onChange={(e) => setQuery(e.target.value)}
				value={query}
				type='text'
				onKeyDown={handleKeyPress}
				placeholder='Search for movies & series'
				className='flex-1 py-2 px-3 rounded border-2 focus:outline-none'
			/>
			<button
				onClick={handleSearch}
				className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
			>
				Search
			</button>
		</div>
	);
}

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
};