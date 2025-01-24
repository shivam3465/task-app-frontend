import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowRightLong } from "react-icons/fa6";

import InputComponent from "../../common/component/InputComponent/InputComponent";
import { validateData } from "../service/auth.util.service";
import { setIsLoggedIn, setUser } from "../../main/redux/slice/user.slice";
import { postDataApiService } from "../../common/services/post.data.api.service";
import { UserConfig } from "../../common/constants/user.config";

const AuthPage = ({ pageType }) => {
	const [data, setData] = useState({});
	const [error, setError] = useState({});
	const [loading, setLoading] = useState(false);

	const queryParams = new URLSearchParams(location.search);
	const email = queryParams.get("email"); //will be used for otp validation

	const { isLoggedIn } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { USER_API_ROUTES, AUTH_PAGE } = UserConfig;

	const handleInputChange = (key, value) => {
		const newData = { ...data, [key]: value };
		setData(newData);

		//if error exists then only validate the new input
		if (error.message) {
			const isValid = validateData(newData, pageType, setError);
			if (isValid) setError({});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (loading) return;

		const isValidData = validateData(data, pageType, setError);
		if (isValidData) {
			setLoading(true);

			const apiRoute = USER_API_ROUTES[pageType]; // Get the API route based on pageType

			if (apiRoute) {
				const [result, error] = await postDataApiService(
					apiRoute,
					data
				);

				if (result?.success) {
					handleSuccess(result); // Handle success
				} else {
					handleError(error); // Handle error
				}
			} else {
				console.error("Invalid pageType for API call");
			}

			setLoading(false);
		}
	};

	// Handle success based on pageType
	const handleSuccess = (result, error) => {
		toast.success(result.message);

		// Define next route based on pageType
		let nextRoute = "/";
		if (pageType === AUTH_PAGE.TYPE.LOGIN) {
			dispatch(setIsLoggedIn(true));
			dispatch(setUser(result.user));
		} else if (pageType === AUTH_PAGE.TYPE.FORGOT_PASSWORD) {
			nextRoute = `/reset-password?email=${data.email}`;
		} else {
			nextRoute = "/login";
		}

		navigate(nextRoute);
	};

	// Handle error and show appropriate toast message
	const handleError = (error) => {
		const errorMessage =
			error.response?.data?.message ||
			error.message ||
			"Something went wrong";
		setError({ message: errorMessage });
		toast.error(errorMessage);
	};

	useEffect(() => {
		setData({});
		setError({});
		setLoading(false);

		//pre storing email in data object for validate otp page from route params
		if (pageType === AUTH_PAGE.TYPE.VALIDATE_OTP) setData({ email });
	}, [pageType]);

	// if user is loggedIn then go to homepage
	if (isLoggedIn) return <Navigate to={"/"} />;

	return (
		<div className="flex items-center justify-center h-screen w-screen bg-backgroundGradient">
			<div className="p-[22px] shadow-shadowCard rounded-[8px] bg-white">
				<div className="bg-bannerGradient bg-clip-text text-transparent text-[32px] font-bold text-center">
					Affworld
				</div>

				{/* for showing error to user  */}
				<div
					className={`${
						error.message ? "text-[#f84949]" : "text-[#747373]"
					} text-[13px]  my-4  text-center`}>
					{error.message ||
						AUTH_PAGE.TITLE_MESSAGE[pageType] ||
						"Fill all the fields"}
				</div>

				<form
					onSubmit={handleSubmit}
					className="flex flex-col items-center justify-center w-[320px]">
					{pageType == AUTH_PAGE.TYPE.VALIDATE_OTP && (
						<InputComponent
							type="otp"
							tag="otp"
							label="OTP"
							value={data?.otp || ""}
							error={error.otp}
							handleInputChange={handleInputChange}
						/>
					)}
					{pageType == AUTH_PAGE.TYPE.REGISTER && (
						<InputComponent
							placeholder="Name"
							type="text"
							tag="name"
							label="Name"
							value={data?.name || ""}
							error={error.name}
							handleInputChange={handleInputChange}
						/>
					)}

					{pageType != AUTH_PAGE.TYPE.VALIDATE_OTP && (
						<InputComponent
							placeholder="Email Id"
							type="email"
							tag="email"
							label="Email"
							value={data?.email || ""}
							error={error.email}
							handleInputChange={handleInputChange}
							autoComplete={"email"}
						/>
					)}

					{pageType != AUTH_PAGE.TYPE.FORGOT_PASSWORD && (
						<InputComponent
							placeholder={
								pageType == AUTH_PAGE.TYPE.VALIDATE_OTP
									? "New Password"
									: "Password"
							}
							type="password"
							tag="password"
							label={
								pageType == AUTH_PAGE.TYPE.VALIDATE_OTP
									? "New Password"
									: "Password"
							}
							value={data?.password || ""}
							error={error.password}
							handleInputChange={handleInputChange}
						/>
					)}

					<button
						className={`bg-bannerGradient rounded-md p-2 mt-[20px]  flex items-center justify-center text-white h-[40px] w-full ${
							loading
								? "cursor-not-allowed active:scale-100"
								: "cursor-pointer active:scale-95"
						}`}
						type={"submit"}>
						{loading ? (
							<img
								src="https://affworld-app.netlify.app/assets/loader.gif"
								alt="Loader"
								className="h-full"
							/>
						) : (
							<>
								<span className="border-0 border-black">
									{AUTH_PAGE.SUBMIT_BTN_TEXT[pageType] ||
										"Submit"}
								</span>
								<FaArrowRightLong className=" border-0 ml-2 text-xs mt-[2px] border-black" />
							</>
						)}
					</button>
				</form>

				<div className="flex items-center mt-5 justify-center text-[14px]">
					{pageType == AUTH_PAGE.TYPE.REGISTER
						? "Already have an account, go to  "
						: "Don't have an account "}
					<Link
						to={
							pageType == AUTH_PAGE.TYPE.REGISTER
								? "/login"
								: "/register"
						}
						className="ml-1 text-[#7e7e7e] font-semibold hover:text-[#1e1e1e] hover:underline">
						{pageType == AUTH_PAGE.TYPE.REGISTER
							? "Login Page"
							: "Register here"}
					</Link>
				</div>
				{pageType == AUTH_PAGE.TYPE.LOGIN && (
					<Link
						to={"/forgot-password"}
						className="flex items-center justify-center my-4 text-[#7e7e7e] text-[14px] font-semibold  hover:text-[#1e1e1e] hover:underline cursor-pointer ">
						Forgot Password ?
					</Link>
				)}
			</div>
		</div>
	);
};

export default AuthPage;
