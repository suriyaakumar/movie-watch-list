import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import {
	CalendarBlank,
	Television,
	FilmReel,
	Bookmark,
	Plus,
} from '@phosphor-icons/react';
import { Command } from 'cmdk';

import { useEffect } from 'react';

function Item({ image, title, year, type, currentUser }) {
	const [dropDown, setDropDown] = useState(false);
	const dropdownRef = useRef(null);

	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setDropDown(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='rounded h-full space-y-3 overflow-hidden shadow-md hover:shadow-lg hover:border-1 hover:transition-shadow hover:ease-in-out'>
			<img className='w-full h-4/6 object-fill' src={image} />
			<div className='space-y-3 px-2'>
				<div className='flex justify-between gap-x-2 items-start'>
					<div className='font-bold text-sm md:text-base lg:text-md'>
						{title}
					</div>
					<div className='relative inline-block text-left' ref={dropdownRef}>
						<button
							onClick={() => {
								setDropDown(!dropDown);
							}}
							className='inline-flex rounded px-3 py-2 bg-red-600 hover:bg-red-600 text-white font-bold'
						>
							<Bookmark className='h-5 w-5' />
						</button>
						{dropDown && (
							<div className='origin-top-right absolute right-0 z-50 mt-2 rounded-md shadow-lg bg-white'>
								<Command label='Command Menu'>
									<Command.Input
										placeholder='Search ...'
										className='block px-4 py-2 focus:outline-none'
									/>
									<button className='flex items-center w-full space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
										<Plus size={28} /> <span>New watchlist</span>
									</button>
									<Command.List className='overflow-y-auto h-48'>
										<Command.Empty className='w-11/12 mx-auto p-2 text-center tracking-tight'>No watchlists found.</Command.Empty>
										{currentUser.watchlists && currentUser.watchlists.length > 0 && (
											currentUser.watchlists.map((watchlist) => {
												<Command.Item key={watchlist?.id} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
												 {watchlist?.name}
											</Command.Item>
											}))}
									</Command.List>
								</Command>
							</div>
						)}
					</div>
				</div>
				<div className='flex items-center space-x-3'>
					<p className='flex items-center space-x-1.5'>
						<CalendarBlank className='h-6 w-6' />
						<span className='text-base md:text-base lg:text-md'>{year}</span>
					</p>
					<p className='flex items-center space-x-1.5'>
						{type ? (
							<Television className='h-6 w-6' />
						) : (
							<FilmReel className='h-6 w-6' />
						)}
						<span className='capitalize text-sm md:text-base lg:text-md'>
							{type}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}

Item.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	year: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	currentUser: PropTypes.object.isRequired,
};

export default Item;
