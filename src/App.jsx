import { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
import AuthGuard from "./app/auth/component/AuthGuard";
import AuthPage from "./app/auth/page/Auth.page";
import { UserConfig } from "./app/common/constants/user.config";

import MainHeader from "./app/main/component/Main.header.component";
import TaskPage from "./app/user/page/User.task.page";
import FeedPage from "./app/user/page/User.feed.page";
import AuthWrapper from "./app/auth/component/AuthWrapper.component";

function App() {
	return (
		<div>
			<div className="bg-backgroundGradient fixed top-0 left-0 w-full h-screen z-[-1]"></div>
			<Router>
				{/* for checking the authentication  */}
				<AuthGuard />

				<MainHeader />
				<Routes>
					<Route element={<AuthWrapper />}>
						<Route path="/" element={<TaskPage />} />
						<Route path="/feeds" element={<FeedPage />} />
					</Route>

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
								pageType={UserConfig.AUTH_PAGE.TYPE.REGISTER}
							/>
						}
					/>
					<Route
						path="/forgot-password"
						element={
							<AuthPage
								pageType={
									UserConfig.AUTH_PAGE.TYPE.FORGOT_PASSWORD
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
				</Routes>
			</Router>
			<ToastContainer />
		</div>
	);
}

export default App;
