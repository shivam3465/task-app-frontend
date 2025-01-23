export const UserConfig = {
	USER_API_ROUTES: {
		REGISTER: "auth/register",
		LOGIN: "auth/login",
		ME: "auth/me",
		LOGOUT: "auth/logout",
		FORGOT_PASSWORD: "auth/forgot-password",
		VALIDATE_OTP: "auth/validate-otp",
	},
	AUTH_PAGE: {
		TYPE: {
			LOGIN: "LOGIN",
			REGISTER: "REGISTER",
			FORGOT_PASSWORD: "FORGOT_PASSWORD",
			VALIDATE_OTP: "VALIDATE_OTP",
		},
		TITLE_MESSAGE: {
			LOGIN: "Login to access the application",
			REGISTER: "Register to access the application",
			FORGOT_PASSWORD: "An OTP will be sent on this mail",
			VALIDATE_OTP: "Enter the OTP and new password",
		},
		SUBMIT_BTN_TEXT: {
			LOGIN: "LOGIN",
			REGISTER: "REGISTER",
			FORGOT_PASSWORD: "FORGOT_PASSWORD",
			VALIDATE_OTP: "VALIDATE_OTP",
		},
	},
};
