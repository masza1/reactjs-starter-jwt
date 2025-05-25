import { getUserDetail, loginAction } from "@src/redux/actions/auth/authAction"

import { createSlice } from "@reduxjs/toolkit"

// import { clearPersistedState } from "../../store"


const initialState = {
    isAuthenticated: false,
    loading: false,
    user: {},
    token: null,
    refreshToken: null,
    error: null,
}

const authSlice = createSlice( {
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: ( state, action ) => {
            state.isAuthenticated = true
            state.user = action.payload.user
            state.token = action.payload.token
            // console.log(state);
        },
        logout: ( state ) => {
            // clearPersistedState();
            state.isAuthenticated = false
            state.user = {}
            state.token = null
        },
    },
    extraReducers: ( builder ) => {
        builder
            // Handle login pending state
            .addCase( loginAction.pending, ( state ) => {
                state.loading = true;
                state.error = null;
            } )
            // Handle login success state
            .addCase( loginAction.fulfilled, ( state, action ) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user || {};
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
            } )
            // Handle login rejected state
            .addCase( loginAction.rejected, ( state, action ) => {
                state.loading = false;
                state.error = action.payload; // Error message from rejectWithValue
            } )
            // Handle login pending state
            .addCase( getUserDetail.pending, ( state ) => {
                state.loading = true;
                state.error = null;
            } )
            // Handle login success state
            .addCase( getUserDetail.fulfilled, ( state, action ) => {
                state.loading = false;
                state.user = { ...action.payload };
            } )
            // Handle login rejected state
            .addCase( getUserDetail.rejected, ( state, action ) => {
                state.loading = false;
                state.error = action.payload; // Error message from rejectWithValue
            } );
    },
} )

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer