import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { House, ListHeart, SignOut } from '@phosphor-icons/react';

const NavLinks = ({ currentUserName, currentUserImage, onLogout }) => (
	<div className='w-full space-y-0.5'>
		<Link
			to='/profile'
			className='w-full flex items-center space-x-3 py-3 px-4 hover:bg-red-600 hover:text-white'
		>
			<div className='h-8 w-8 sm:h-7 sm:w-7 md:h-10 md:w-10 bg-gray-200 rounded-full overflow-hidden'>
				{currentUserImage && <img className='h-full w-full object-cover' src={currentUserImage} />}
			</div>
			<span className='text-base font-medium'>
				{currentUserName || 'GUEST'}
			</span>
		</Link>
		<Link
			className='py-3 px-4 flex items-center space-x-2 hover:bg-red-600 hover:text-white'
			to='/home'
		>
			<House className='h-5 w-5' />
			<span className='text-sm tracking-tight'>Home</span>
		</Link>
		<Link
			className='py-3 px-4 flex items-center space-x-2 hover:bg-red-600 hover:text-white'
			to='/watchlists'
		>
			<ListHeart className='h-5 w-5' />
			<span className='text-sm tracking-tight'>Watchlists</span>
		</Link>
		<button
			className='py-3 px-4 w-full flex items-center space-x-2 text-red-600 hover:bg-red-600 hover:text-white'
			onClick={onLogout}
		>
			<SignOut className='h-5 w-5' />
			<span className='text-sm tracking-tight'>Logout</span>
		</button>
	</div>
);

NavLinks.propTypes = {
	currentUserName: PropTypes.string,
	currentUserImage: PropTypes.string,
	onLogout: PropTypes.func.isRequired,
};

export default NavLinks;
