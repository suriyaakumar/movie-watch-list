import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DatabaseProvider } from './contexts/dbContext.jsx';
import ProtectedRoute from './auth/protectedRoute.jsx';
import Home from './screens/home.jsx';
import Login from './screens/login.jsx';
import Profile from './screens/profile.jsx';
import Watchlist from './screens/watchlist.jsx';
import Watchlists from './screens/watchlists.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
	return (
		<DatabaseProvider>
			<ToastContainer
				position='bottom-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'
			/>
			<Router>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route element={<ProtectedRoute />}>
						<Route path='home' element={<Home />} />
						<Route path='profile' element={<Profile />} />
						<Route path='watchlist/:id' element={<Watchlist />} />
						<Route path='watchlists' element={<Watchlists />} />
					</Route>
				</Routes>
			</Router>
		</DatabaseProvider>
	);
}

export default App;
