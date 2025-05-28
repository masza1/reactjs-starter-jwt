import apiClient from "@src/utils/apiClient";

export const loginRequest = async (data) => {
	const response = await apiClient("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Login failed");
	}

	return response.json();
};

export const logoutRequest = async () => {
	const response = await apiClient("/api/auth/logout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Logout failed");
	}

	return response.json();
};

export const getUserDetailRequest = async () => {
	const response = await apiClient("/api/auth/user", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Failed to fetch user details");
	}

	return response.json();
};

export const registerRequest = async (data) => {
	const response = await apiClient("/api/auth/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Registration failed");
	}

	return response.json();
};
