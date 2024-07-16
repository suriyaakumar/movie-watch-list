import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DatabaseProvider } from './contexts/dbContext.jsx';
import ProtectedRoute from './auth/protectedRoute.jsx';
import Home from './screens/home.jsx';
import Login from './screens/login.jsx';
import Profile from './screens/profile.jsx';
import Watchlists from './screens/watchlists.jsx';

function App() {
	return (
		<DatabaseProvider>
				<Router>
					<Routes>
						<Route path='/' element={<Login />} />
						<Route element={<ProtectedRoute />}>
							<Route path='home' element={<Home />} />
							<Route path='profile' element={<Profile />} />
							<Route path='watchlists' element={<Watchlists />} />
						</Route>
					</Routes>
				</Router>
		</DatabaseProvider>
	);
}

export default App;
