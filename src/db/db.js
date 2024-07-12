import { openDB } from 'idb';

const initDB = async () => {
	return openDB('wl-db', 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains('users')) {
				db.createObjectStore('users');
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
