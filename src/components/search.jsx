import { useState } from 'react';
import PropTypes from 'prop-types';


/**
 * Renders a search input field and a search button. 
 * When the user types in the input field and presses Enter or clicks the search button, 
 * the `onSearch` function is called with the current value of the input field as an argument.
 *
 * @param {function} onSearch - a function that takes a string as an argument and performs a search operation.
 * @return {JSX.Element} A React component representing a search input field and a search button.
 */
export default function Search({ onSearch }) {
	const [query, setQuery] = useState('');

	/**
	 * Handle the search action by invoking the `onSearch` function with the current query value.
	 *
	 * @param {void} No parameters.
	 * @return {void} No return value.
	 */
	const handleSearch = () => {
		onSearch(query);
	};

	/**
	 * A function that handles key press events.
	 *
	 * @param {Event} event - The event object triggered by the key press.
	 * @return {void} No return value.
	 */
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