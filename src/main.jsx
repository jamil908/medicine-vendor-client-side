import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import AuthProvider from "./Providers/AuthProvider";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
