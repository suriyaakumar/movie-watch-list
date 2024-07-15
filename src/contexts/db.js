import { openDB } from 'idb';
import { v4 as uuidv4 } from 'uuid';

const initDB = async () => {
	return openDB('wl-db', 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains('users')) {
				db.createObjectStore('users');
				db.createObjectStore('watchlists');
			}
		},
	});
};

export const setUser = async (key, value) => {
	const db = await initDB();
	return db.put('users', value, key);
};

export const getUser = async (key) => {
	const db = await initDB();
	return db.get('users', key);
};

export const deleteUser = async (key) => {
	const db = await initDB();
	return db.delete('users', key);
};

export const getWatchlist = async (key) => {
	const db = await initDB();
	return db.get('watchlists', key);
};

export const setWatchlist = async (key, value) => {
	const db = await initDB();
	return db.put('watchlists', value, key);
};

export const createWatchlist = async (key) => {
	const id = uuidv4();
	const user = await getUser(key);
	const watchlists = user.watchlists ? user.watchlists.push(id) : [id];
	const createUser = await setUser(key, {
		...user,
		watchlists,
	});
	let createWatchlist;
	if (createUser) {
		createWatchlist = await setWatchlist(id, {
			name: 'New Watchlist',
			movies: [],
		});
	}
	return createWatchlist;
};
