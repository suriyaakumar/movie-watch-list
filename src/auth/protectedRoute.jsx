import { Outlet, Navigate } from 'react-router-dom';
import Layout from '../components/layout';

const ProtectedRoute = () => {
    const user = localStorage.getItem('user');
    return user ? <Layout><Outlet /></Layout> : <Navigate to="/" replace />;
};

export default ProtectedRoute;