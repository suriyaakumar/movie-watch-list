import { Command } from 'cmdk';
import { Plus, Bookmark } from '@phosphor-icons/react';
import { useCreateWatchlist } from '../hooks/useCreateWatchList';
import PropTypes from 'prop-types';
import * as Popover from '@radix-ui/react-popover';


/**
 * Renders the watchlist search component.
 *
 * @param {Object} currentUser - The current user object.
 * @param {Object} movie - The movie object.
 * @param {Function} onSelect - The function to handle selection.
 * @return {JSX.Element} The rendered watchlist search component.
 */
export default function WatchListSearch({ currentUser, movie, onSelect }) {
	const createWatchlist = useCreateWatchlist();

	const handleSelect = (...args) => {
		if (onSelect) {
			onSelect(...args);
		}
	};

	return (
		<Popover.Root>
			<Popover.Trigger className='inline-flex rounded p-1.5 bg-red-600 hover:bg-red-600 text-white font-bold'>
				<Bookmark className='h-5 w-5' />
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content className='bg-white rounded shadow-2xl border-2 mt-2'>
					<Command>
						<Command.Input
							placeholder='Search ...'
							className='block px-4 py-2 focus:outline-none'
						/>
						<button
							onClick={() => createWatchlist(movie)}
							className='flex items-center w-full space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
						>
							<Plus size={28} /> <span>New watchlist</span>
						</button>
						<Command.List className='overflow-y-auto h-28 xl:h-40'>
							<Command.Empty className='w-11/12 mx-auto p-2 text-center tracking-tight'>
								No watchlists found.
							</Command.Empty>
							{currentUser.watchlists &&
								currentUser.watchlists.length > 0 &&
								currentUser.watchlists.map((watchlist) => (
									<Command.Item
										onSelect={() => handleSelect(watchlist?.id, movie)}
										key={watchlist?.id}
										className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
									>
										{watchlist?.name}
									</Command.Item>
								))}
						</Command.List>
					</Command>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}

WatchListSearch.propTypes = {
	currentUser: PropTypes.object,
	movie: PropTypes.object,
	onSelect: PropTypes.func,
};
