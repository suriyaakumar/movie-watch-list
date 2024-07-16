import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { House, User, ListHeart, SignOut } from '@phosphor-icons/react';

const NavLinks = ({ onLogout }) => (
	<div className='w-11/12 mx-auto space-y-0.5'>
		<Link className='p-2 flex items-center space-x-4' to='/home'>
			<House className='h-5 w-5' />
			<span className='text-lg tracking-tight'>Home</span>
		</Link>
		<Link className='p-2 flex items-center space-x-4' to='/profile'>
			<User className='h-5 w-5' />
			<span className='text-lg tracking-tight'>Profile</span>
		</Link>
		<Link className='p-2 flex items-center space-x-4' to='/watchlists'>
			<ListHeart className='h-5 w-5' />
			<span className='text-lg tracking-tight'>Watchlists</span>
		</Link>
		<button
			className='p-2 flex items-center space-x-4 text-red-600'
			onClick={onLogout}
		>
			<SignOut className='h-6 w-6' />
			<span className='text-lg tracking-tight'>Logout</span>
		</button>
	</div>
);

NavLinks.propTypes = {
    onLogout: PropTypes.func.isRequired
};

export default NavLinks;
