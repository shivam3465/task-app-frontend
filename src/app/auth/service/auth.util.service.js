import { UserConfig } from "../../common/constants/user.config";

const validateData = (data, pageType, setError) => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const { AUTH_PAGE } = UserConfig;

	if (
		pageType == AUTH_PAGE.TYPE.REGISTER &&
		(!data.name || data.name.length < 2)
	) {
		setError({
			name: true,
			message: "Name must be at least 2 characters or more",
		});
		return false;
	}
	if (
		pageType != AUTH_PAGE.TYPE.VALIDATE_OTP &&
		(!data.email || !emailRegex.test(data.email))
	) {
		setError({ email: true, message: "Please enter a valid email id" });
		return false;
	}
	if (
		pageType != AUTH_PAGE.TYPE.FORGOT_PASSWORD &&
		(!data.password || data.password.length < 5)
	) {
		setError({
			password: true,
			message: "Password must be at least 5 characters or more",
		});
		return false;
	}
	if (
		pageType == AUTH_PAGE.TYPE.VALIDATE_OTP &&
		(!data.otp || data.otp.length < 4)
	) {
		setError({
			password: true,
			message: "OTP required",
		});
		return false;
	}
	return true;
};

export { validateData };
