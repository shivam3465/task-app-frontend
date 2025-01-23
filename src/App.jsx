import { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
import AuthGuard from "./app/auth/component/AuthGuard";
import AuthPage from "./app/auth/page/Auth.page";
import { UserConfig } from "./app/common/constants/user.config";

function App() {
	return (
		<div>
			<Router>
				<Routes>
					{/* for login state check */}
					<Route element={<AuthGuard />}>
						<Route path="/" element={<div>Hello</div>} />

						<Route
							path="/login"
							element={
								<AuthPage
									pageType={UserConfig.AUTH_PAGE.TYPE.LOGIN}
								/>
							}
						/>
						<Route
							path="/register"
							element={
								<AuthPage
									pageType={
										UserConfig.AUTH_PAGE.TYPE.REGISTER
									}
								/>
							}
						/>
						<Route
							path="/forgot-password"
							element={
								<AuthPage
									pageType={
										UserConfig.AUTH_PAGE.TYPE
											.FORGOT_PASSWORD
									}
								/>
							}
						/>
						<Route
							path="/reset-password"
							element={
								<AuthPage
									pageType={
										UserConfig.AUTH_PAGE.TYPE.VALIDATE_OTP
									}
								/>
							}
						/>
					</Route>
				</Routes>
			</Router>
			<ToastContainer />
		</div>
	);
}

export default App;
