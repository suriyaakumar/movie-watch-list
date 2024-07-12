import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DatabaseProvider } from './db/dbContext.jsx';
import Home from './components/home.jsx';
import Login from './components/login.jsx';
import ProtectedRoute from './auth/protectedRoute.jsx';

function App() {
  return (
    <DatabaseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </DatabaseProvider>
  )
}

export default App
