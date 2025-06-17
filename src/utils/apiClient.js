// Removed useDispatch import as it cannot be used at the top level

import { logoutUser, setAccessToken } from "@src/redux/reducers/auth/authReducer";
import { store } from "@src/redux/store";
import axios from "axios";

let accessToken = null;
let csrfToken = null;

export const setAuthToken = (token) => {
	accessToken = token;
};
export const setCsrfToken = (token) => {
	csrfToken = token;
};

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL_API, // Use the environment variable
	timeout: 10000, // Optional: Set a timeout for requests
	withCredentials: true, // Optional: Include credentials in requests if needed
	headers: {
		"X-Requested-With": "XMLHttpRequest",
	},
});

apiClient.interceptors.request.use(
	(config) => {
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		if (csrfToken) {
			config.headers["X-CSRF-Token"] = csrfToken; // Set CSRF token if available
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Refresh Token logic (for 401 errors)
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, accessToken = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(accessToken);
		}
	});
	failedQueue = [];
};

apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// 🔁 Prevent infinite retry for /refresh itself
		if (originalRequest.url == "/refresh") {
			throw error;
		}

		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((accessToken) => {
						originalRequest.headers["Authorization"] = "Bearer " + accessToken;
						return apiClient(originalRequest);
					})
					.catch((err) => Promise.reject(err));
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const response = await apiClient.post("/refresh");
				const newToken = response.data.access_token;
				
				// localStorage.setItem("accessToken", newToken); // Optionally save to localStorage
				store.dispatch(setAccessToken(response.data));
				setAuthToken(newToken);
				// setCsrfToken(response.data.csrf_token); // Update CSRF token if available
				apiClient.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
				processQueue(null, newToken);
				return apiClient(originalRequest);
			} catch (err) {
				store.dispatch(logoutUser());
				
				processQueue(err, null);
				return Promise.reject(err);
			} finally {
				isRefreshing = false;
			}
		}
		return Promise.reject(error);
	}
);

export default apiClient;
