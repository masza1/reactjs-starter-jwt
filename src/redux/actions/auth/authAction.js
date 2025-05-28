import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAction = createAsyncThunk(
	"auth/login",
	async (_, { rejectWithValue }) => {
		try {
			// Simulate a login request to an API
			return await new Promise((resolve) => {
				setTimeout(() => {
					const {
						user,
						token,
						refresh_token: refreshToken,
					} = {
						user: {
							email: "example@gmail.com",
							role: "admin", // This should match the loginRole for successful login
							full_name: "Example User",
							uuid: "123e4567-e89b-12d3-a456-426614174000",
						},
						token: "mockedAccess",
					};

					resolve({
						user,
						token,
						refreshToken,
					});
				}, 1000); // Simulate network delay
			});
		} catch {
			return rejectWithValue("Login failed");
		}
	}
);

export const logoutAction = createAsyncThunk("auth/logout", async () => {
	// add logic logout request to API
	return await new Promise((resolve) => {
		setTimeout(() => {
			resolve(true); // Simulate successful logout
		}, 1000); // Simulate network delay
	});
});
