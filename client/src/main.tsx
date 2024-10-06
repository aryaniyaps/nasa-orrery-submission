import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import router from "./router";

export default function App() {
  return (
    <React.StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
