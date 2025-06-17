import { login, register, logout, refreshToken, resetPassword } from "@src/redux/actions/auth/authAction";

import { createSlice } from "@reduxjs/toolkit";

// import { clearPersistedState } from "../../store"

const initialState = {
	isAuthenticated: false,
	user: {},
	accessToken: null,
	csrfToken: null,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload;
		},
		setUser(state, action) {
			state.user = action.payload.user;
			state.error = null;
			state.loading = false;
		},
		setError(state, action) {
			state.error = action.payload;
		},
		logoutUser(state) {
			state.user = null;
			state.accessToken = null;
			state.refreshToken = null;
		},
		setAccessToken(state, action) {
			state.accessToken = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.accessToken = action.payload.access_token;
				state.csrfToken = action.payload.csrf_token;
				state.isAuthenticated = true;
				state.error = null;
				state.loading = false;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.accessToken = action.payload.access_token;
				state.refreshToken = action.payload.refresh_token;
				state.csrfToken = action.payload.csrf_token;
				state.isAuthenticated = true;
				state.error = null;
				state.loading = false;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.accessToken = null;
				state.refreshToken = null;
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				state.accessToken = action.payload.accessToken;
				state.error = null;
			})
			.addCase(resetPassword.fulfilled, (state) => {
				state.error = null;
			})
			.addMatcher(
				(action) => action.type.endsWith("rejected"),
				(state, action) => {
					state.error = action.payload;
					state.loading = false;
				}
			);
	},
});

export const { setLoading, setUser, setError, logoutUser, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
