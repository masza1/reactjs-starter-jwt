import { persistReducer, persistStore } from "redux-persist";

import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { thunk } from "redux-thunk";

// Function to clear the persisted state
export const clearPersistedState = () => {
	storage.removeItem("persist:root");
};

// clearPersistedState();
const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth", "params"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
	devTools: true, // optional
});

export const persistor = persistStore(store);
