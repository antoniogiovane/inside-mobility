import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./styles/style.css";
import "./styles/configurator.css";

// Tema salvato prima del render (evita flash)
const saved = localStorage.getItem("im-theme");
if (saved === "light") document.documentElement.setAttribute("data-theme", "light");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
