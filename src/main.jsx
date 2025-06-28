import "./index.css";

import { createRoot } from "react-dom/client";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import ModalComponent from "./components/ModalComponent";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();
const baseName = import.meta.env.VITE_BASENAME || "/";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<BrowserRouter basename={baseName}>
						<AppRouter  />
					</BrowserRouter>
					<ToastContainer position="bottom-right" />
					<ModalComponent />
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	</StrictMode>
);
