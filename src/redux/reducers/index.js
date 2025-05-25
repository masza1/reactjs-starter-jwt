import authReducer from "./auth/authReducer.js";
import { combineReducers } from "@reduxjs/toolkit";
import fetchReducer from "./fetchReducer.js";
import hiddenParamsReducer from "./hiddenParamsReducer.js";
import modalReducer from "./modalReducer.js";
import submissionReducer from "./submissionReducer.js";

export const rootReducer = combineReducers( {
    auth: authReducer,
    params: hiddenParamsReducer,
    modal: modalReducer,
    submission: submissionReducer,
    fetch: fetchReducer
} )