// Removed useDispatch import as it cannot be used at the top level

import axios from "axios";
import { logout } from "@src/redux/reducers/auth/authReducer";
import { store } from "../redux/store";
import { toast } from "react-toastify";

// Removed useDispatch call; use store.dispatch directly where needed

const apiClient = axios.create( {
    baseURL: import.meta.env.VITE_BASE_URL_API, // Use the environment variable
    timeout: 10000, // Optional: Set a timeout for requests
} );


apiClient.interceptors.request.use(
    ( config ) => {
        const state = store.getState();
        const token = state.auth.token;

        if ( token ) {
            config.headers.Authorization = `Bearer ${ token }`;
        }

        return config;
    },
    ( error ) => {
        return Promise.reject( error );
    }
);

apiClient.interceptors.response.use(
    ( response ) => response,
    async ( error ) => {
        const originalRequest = error.config;
        const { success, code, message } = error.response?.data || {};

        // Check if the error is due to token expiration (401 Unauthorized)
        if ( !success ) {
            console.log( "Error response:", error.response );

            if ( code === "not_authenticated" || ( code === "error" && message === "Token is invalid or expired" ) ) {
                // clearPersistedState();
                toast.error( message || "Session expired. Please log in again." );
                store.dispatch( logout() )
            }
        }

        return Promise.reject( error );
    }
);

export default apiClient;