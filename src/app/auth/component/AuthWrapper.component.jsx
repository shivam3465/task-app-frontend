import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthWrapper = () => {
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	// Redirect to /login if not logged in
	return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthWrapper;
