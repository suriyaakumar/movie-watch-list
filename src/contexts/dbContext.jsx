import { createContext, useEffect, useState } from 'react';
import { setUser, getUser, deleteUser } from './db';
import PropTypes from 'prop-types';

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      await getUser('init');
      setDbInitialized(true);
    };
    init();
  }, []);

  return (
    <DatabaseContext.Provider value={{ setUser, getUser, deleteUser, dbInitialized }}>
      {children}
    </DatabaseContext.Provider>
  );
};

DatabaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DatabaseContext;

