import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatabaseContext from '../contexts/dbContext';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({});
	const { getUser } = useContext(DatabaseContext);

	useEffect(() => {
		const fetchUser = async () => {
            const user = await getUser(localStorage.getItem('user'));
			setCurrentUser(user);
		};
		fetchUser();
	}, [getUser]);

	const updateUser = async (updatedUser) => {
    setCurrentUser(updatedUser);
  	};

	return (
		<UserContext.Provider value={{currentUser, updateUser}}>{children}</UserContext.Provider>
	);
};

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};