import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { House, ListHeart, SignOut } from '@phosphor-icons/react';

const NavLinks = ({ currentUserName, currentUserImage, onLogout }) => (
	<div className='w-11/12 mx-auto space-y-0.5'>
		<Link
			to='/profile'
			className='w-full flex items-center space-x-5 sm:space-x-1 md:space-x-5 rounded py-4 px-2 hover:bg-red-600 hover:text-white hover:rounded'
		>
			<img
				src={currentUserImage}
				className='h-8 w-8 sm:h-6 sm:w-6 md:h-8 md:w-8 rounded-full outline-none'
			/>
			<span className='text-sm'>{currentUserName || 'GUEST'}</span>
		</Link>
		<Link
			className='p-2 flex items-center space-x-4 hover:bg-red-600 hover:text-white hover:rounded'
			to='/home'
		>
			<House className='h-5 w-5' />
			<span className='text-lg tracking-tight'>Home</span>
		</Link>
		<Link
			className='p-2 flex items-center space-x-4 hover:bg-red-600 hover:text-white hover:rounded'
			to='/watchlists'
		>
			<ListHeart className='h-5 w-5' />
			<span className='text-lg tracking-tight'>Watchlists</span>
		</Link>
		<button
			className='p-2 w-full flex items-center space-x-4 text-red-600 hover:bg-red-600 hover:text-white hover:rounded'
			onClick={onLogout}
		>
			<SignOut className='h-6 w-6' />
			<span className='text-lg tracking-tight'>Logout</span>
		</button>
	</div>
);

NavLinks.propTypes = {
	currentUserName: PropTypes.string,
	currentUserImage: PropTypes.string,
    onLogout: PropTypes.func.isRequired
};

export default NavLinks;
