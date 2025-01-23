import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoggedIn: false,
	user: {},
	loading: true,
	notifications: [],
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setIsLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setNotifications: (state, action) => {
			state.notifications = action.payload;
		},
		resetUserState: () => initialState,
	},
});

export const {
	setIsLoggedIn,
	setUser,
	setLoading,
	setNotifications,
	resetUserState,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
