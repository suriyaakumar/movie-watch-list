import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DatabaseProvider } from './contexts/dbContext.jsx';
import Home from './screens/home.jsx';
import Login from './screens/login.jsx';
import ProtectedRoute from './auth/protectedRoute.jsx';
import Watchlist from './screens/watchlist.jsx';

function App() {
	return (
		<DatabaseProvider>
			<Router>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route element={<ProtectedRoute />}>
						<Route path='home' element={<Home />} />
						<Route path='list/:id' element={<Watchlist />} />
					</Route>
				</Routes>
			</Router>
		</DatabaseProvider>
	);
}

export default App;
