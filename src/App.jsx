import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DatabaseProvider } from './db/dbContext.jsx';
import Home from './components/home.jsx';
import Login from './components/login.jsx';

function App() {
  return (
    <DatabaseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </DatabaseProvider>
  )
}

export default App
