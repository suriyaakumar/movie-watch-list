import { Trash } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function WatchListItem({ id, name, handleAction }) {
	return (
		<div className='w-full flex items-center justify-between p-3 hover:bg-gray-100'>
			<Link
				className='flex-1'
				to={`/watchlist/${id}`}
				state={{ id }}
			>
				{name}
			</Link>
			<button onClick={() => handleAction(id)} className='text-red-600'>
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
