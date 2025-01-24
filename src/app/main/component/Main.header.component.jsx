import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosLogOut } from "react-icons/io";

import { getDataApiService } from "../../common/services/get.data.api.service";
import { UserConfig } from "../../common/constants/user.config";
import { setIsLoggedIn, setUser } from "../redux/slice/user.slice";

const MainHeader = () => {
	const location = useLocation(); // Hook to access the current route
	const currentRoute = location.pathname; // Get the current path
	const { isLoggedIn } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	// Define header options (tabs) as an array of objects
	const headerOptions = [
		{ label: "Tasks", path: "/" },
		{ label: "Feeds", path: "/feeds" },
	];
	const handleLogout = async () => {
		const [result, error] = await getDataApiService(
			`${UserConfig.USER_API_ROUTES.LOGOUT}`
		);

		if (result?.success) {
			toast.success(result.message);
			dispatch(setUser(null));
			dispatch(setIsLoggedIn(false));
		} else {
			const errorMessage =
				error.response?.data?.message ||
				error.message ||
				"Something went wrong";
			toast.error(errorMessage);
		}
	};

	return (
		isLoggedIn && (
			<div className="flex items-center justify-between py-2 px-4 bg-[#00000017] ">
				<div className="cursor-pointer text-lg">Affworld</div>
				<div className="flex items-center justify-between border-[1px] border-[#d0d0d057] bg-[#d0d0d026] rounded-full">
					{headerOptions.map((option) => (
						<Link
							to={option.path}
							key={option.path}
							className={`cursor-pointer rounded-full py-[6px] px-8 ${
								currentRoute === option.path
									? "bg-gray-300"
									: "hover:bg-[#80808064]"
							}`}>
							{option.label}
						</Link>
					))}
				</div>

				<div className="settings">
					<div
						title="Logout"
						className="p-2 cursor-pointer text-white hover:bg-[#9da6a753] rounded-full mr-4 "
						onClick={handleLogout}>
						<IoIosLogOut className="text-[20px]" />
					</div>
				</div>
			</div>
		)
	);
};

export default MainHeader;
