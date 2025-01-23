const handleLogin = async (data) => {
	const [result, error] = await postDataApiService(
		`${USER_API_ROUTES.LOGIN}`,
		data
	);

	if (result?.success) {
		toast.success(result.message);
		dispatch(setIsLoggedIn(true));
		dispatch(setUser(result.user));
		return navigate("/");
	} else {
		setError({
			message:
				error.response.data.message ||
				error.message ||
				"Something went wrong",
		});
		toast.error(
			error.response.data.message ||
				error.message ||
				"Something went wrong"
		);
	}
};

const handleRegister = async (data) => {
	const [result, error] = await postDataApiService(
		`${USER_API_ROUTES.LOGIN}`,
		data
	);

	if (result?.success) {
		toast.success(result.message);
		return navigate("/login");
	} else {
		setError({
			message:
				error.response.data.message ||
				error.message ||
				"Something went wrong",
		});
		toast.error(
			error.response.data.message ||
				error.message ||
				"Something went wrong"
		);
	}
};

const handleForgotPassword = async (data) => {
	const [result, error] = await postDataApiService(
		`${USER_API_ROUTES.FORGOT_PASSWORD}`,
		data
	);

	if (result?.success) {
		toast.success(result.message);
		return navigate(`/reset-password?email=${data.email}`);
	} else {
		setError({
			message:
				error.response.data.message ||
				error.message ||
				"Something went wrong",
		});
		toast.error(
			error.response.data.message ||
				error.message ||
				"Something went wrong"
		);
	}
};

const handleOTPValidationAndPasswordReset = async (data) => {
	const [result, error] = await postDataApiService(
		`${USER_API_ROUTES.VALIDATE_OTP}`,
		data
	);

	if (result?.success) {
		toast.success(result.message);
		return navigate("/login");
	} else {
		setError({
			message:
				error.response.data.message ||
				error.message ||
				"Something went wrong",
		});
		toast.error(
			error.response.data.message ||
				error.message ||
				"Something went wrong"
		);
	}
};

export {
	handleLogin,
	handleRegister,
	handleForgotPassword,
	handleOTPValidationAndPasswordReset,
};
