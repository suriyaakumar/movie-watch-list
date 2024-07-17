import { Trash } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function WatchListItem({ id, name, handleAction }) {
	const navigate = useNavigate();
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
