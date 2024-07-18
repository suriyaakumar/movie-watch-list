import { Trash } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';


/**
 * Renders a watchlist item component with a name, an id, and a handleAction function.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The id of the watchlist item.
 * @param {string} props.name - The name of the watchlist item.
 * @param {function} props.handleAction - The function to handle the action on the watchlist item.
 * @return {JSX.Element} The rendered watchlist item component.
 */
export default function WatchListItem({ id, name, handleAction }) {
	const navigate = useNavigate();
	
	/**
	 * Navigates to a specific watchlist based on the provided ID.
	 *
	 * @param {string} id - The ID of the watchlist.
	 * @return {void} No return value.
	 */
	const handleNavigate = (id) => {
		navigate(`/watchlist/${id}`, { state: { id } });
	};

	return (
		<div className='w-full flex items-center justify-between hover:bg-gray-100'>
			<div onClick={() => handleNavigate(id)} className='flex-1 p-3'>
				{name}
			</div>
			<button onClick={() => handleAction(id)} className='text-red-600 p-3'>
				<Trash size={24} />
			</button>
		</div>
	);
}

WatchListItem.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	handleAction: PropTypes.func.isRequired,
};
