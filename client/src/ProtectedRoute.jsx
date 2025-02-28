import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
    const user = Cookies.get('token');

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
