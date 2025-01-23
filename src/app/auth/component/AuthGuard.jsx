import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	setIsLoggedIn,
	setLoading,
	setNotifications,
	setUser,
} from "../../main/redux/slice/user.slice";
import { getDataApiService } from "../../common/services/get.data.api.service";
import { UserConfig } from "../../common/constants/user.config";

const AuthGuard = () => {
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUserDetail = async () => {
			dispatch(setLoading(true));
			const [data, error] = await getDataApiService(
				UserConfig.USER_API_ROUTES.ME
			);
			dispatch(setLoading(false));

			//if data exists then user is logged In
			if (data) {
				dispatch(setUser(data.user));
				dispatch(setIsLoggedIn(true));
			} else {
				//else user is not logged In
				dispatch(setUser({}));
				dispatch(setIsLoggedIn(false));
			}
		};

		// Fetch user details only if not already logged in
		if (!isLoggedIn) {
			fetchUserDetail();
		}
	}, [isLoggedIn, dispatch]);

	// Show login page if not authenticated
	return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;
