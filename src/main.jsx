import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { interceptor } from "../src/utils/customFetch.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import { store } from "./store.js";

interceptor(store);

const queryClient = new QueryClient({
  defaultOptions: {
    Queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_KEY}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </QueryClientProvider>
);
