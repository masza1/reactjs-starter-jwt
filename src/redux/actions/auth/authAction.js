import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading, setUser, setError, logoutUser } from "@src/redux/reducers/auth/authReducer";
import apiClient, { setAuthToken, setCsrfToken } from "@src/utils/apiClient";

// Login action
export const login = createAsyncThunk(
	"auth/login",
	async ({ email, password }, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setLoading(true));
			const response = await apiClient.post("/login", { email, password });
			setAuthToken(response.data.access_token);
			setCsrfToken(response.data.csrf_token);
			return response.data;
		} catch (error) {
			dispatch(setError("Login failed"));
			return rejectWithValue(error.response?.data || "Login failed");
		} finally {
			dispatch(setLoading(false));
		}
	}
);

// Register action
export const register = createAsyncThunk(
	"auth/register",
	async (data, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setLoading(true));
			const response = await apiClient.post("/register", data);
			dispatch(
				setUser({
					user: response.data.user,
					accessToken: response.data.access_token,
					refreshToken: response.data.refresh_token,
				})
			);
			return response.data;
		} catch (error) {
			dispatch(setError("Registration failed"));
			return rejectWithValue(error.response?.data || "Registration failed");
		} finally {
			dispatch(setLoading(false));
		}
	}
);

// Token Refresh action
export const refreshToken = createAsyncThunk(
	"auth/refreshToken",
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const response = await apiClient.post("/refresh");
			dispatch(setUser({ accessToken: response.data.access_token }));
			setAuthToken(response.data.access_token);
			setCsrfToken(response.data.csrf_token);
			return response.data;
		} catch (error) {
			dispatch(logoutUser());
			dispatch(setError("Session expired"));
			return rejectWithValue("Session expired");
		}
	}
);

// Logout action
export const logout = createAsyncThunk(
	"auth/logout",
	async (_, { dispatch }) => {
		await apiClient.post("/logout");
		dispatch(logoutUser());
	}
);

// Reset Password action
export const resetPassword = createAsyncThunk(
	"auth/resetPassword",
	async (email, { dispatch, rejectWithValue }) => {
		try {
			await apiClient.post("/password/email", { email });
			dispatch(setError("Password reset link sent."));
		} catch (error) {
			dispatch(setError("Error sending reset link."));
			return rejectWithValue("Error sending reset link.");
		}
	}
);

// Get User Profile action
export const getUserProfile = createAsyncThunk(
	"auth/getUserProfile",
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const response = await apiClient.get("/me");
			
			dispatch(setUser({ user: response.data }));
			return response.data;
		} catch (error) {
			console.log(error);
			
			dispatch(setError("Failed to fetch user profile"));
			return rejectWithValue(error.response?.data || "Failed to fetch user profile");
		}
	}
);

