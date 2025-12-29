import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Handle GitHub Pages SPA redirect
const redirect = sessionStorage.getItem('redirect');
if (redirect) {
  sessionStorage.removeItem('redirect');
  const basePath = import.meta.env.MODE === "production" ? "/tasks-manage" : "";
  const cleanPath = redirect.replace(basePath, '') || '/';
  window.history.replaceState(null, '', cleanPath);
}

createRoot(document.getElementById("root")!).render(<App />);
