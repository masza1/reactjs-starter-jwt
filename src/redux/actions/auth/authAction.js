import apiClient from "@src/utils/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAction = createAsyncThunk(
    "auth/login",
    async ({ email, password, loginRole }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/users/login/", { email, password });

            if (response.status !== 200) {
                throw new Error("Login failed");
            }

            if (!response.data.success) {
                return rejectWithValue(response.data.message || "Login failed");
            }

            var { role } = response.data.data;
            const { email: userEmail, access: token, refresh: refreshToken, } = response.data.data;

            if (typeof role === 'string') {

                if (role.includes("[") && role.includes("]")) {
                    try {
                        role = JSON.parse(role.replace(/'/g, '"'));
                        if (Array.isArray(role)) {
                            role = role[0]; // Fallback to array if not an array
                        }
                    } catch (error) {
                        console.error("Failed to parse role:", error.message);
                        role = []; // Fallback value
                    }
                }
            }

            if (role !== loginRole) {
                return rejectWithValue("Login Failed, User Not Found");
            }

            return {
                user: { email: userEmail, role },
                token,
                refreshToken,
            };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
)

export const registerAction = createAsyncThunk(
    "auth/register",
    async ({ email, password, confirmPassword, fullName, role, dob = "1993-10-14" }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("confirm_password", confirmPassword);
            formData.append("full_name", fullName);
            formData.append("hospital", import.meta.env.VITE_HOSPITAL_UUID);
            formData.append("role", role);
            formData.append("country", "IN");
            formData.append("work_email", "work3@grr.la");
            formData.append("gender", "male");
            formData.append("dob", dob);

            // Check if a token is already logged in, otherwise use SUPERADMIN token
            let token;
            const state = typeof window !== "undefined" && window.store
                ? window.store.getState()
                : undefined;
            if (state && state.auth && state.auth.token) {
                token = state.auth.token;
            } else if (import.meta.env.VITE_SUPERADMIN_TOKEN) {
                token = import.meta.env.VITE_SUPERADMIN_TOKEN;
            }

            const response = await apiClient.post("/users/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.status !== 201) {
                throw new Error("Registration failed");
            }

            if (!response.data.success) {
                return rejectWithValue(response.data.message || "Registration failed");
            }

            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
)


export const getUserDetail = createAsyncThunk(
    "auth/getUserDetail",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/users/profile/");

            if (response.status !== 200) {
                throw new Error("Failed to fetch user details");
            }

            if (!response.data.success) {
                return rejectWithValue(response.data.message || "Failed to fetch user details");
            }

            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Logout failed");
        }
    }
)

export const updatePasswordAction = createAsyncThunk(
    "auth/updatePassword",
    async ({ oldPassword, newPassword }, { rejectWithValue }) => {
        try {
            const response = await apiClient.put("/users/password/", { old_password: oldPassword, password: newPassword });

            if (response.status !== 200) {
                throw new Error("Update Password failed");
            }

            if (!response.data.success) {
                return rejectWithValue(response.data.message || "Update Password failed");
            }

            return null
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Update Password failed");
        }
    }
)