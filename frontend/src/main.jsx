import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

import { NotContextProvider } from "../contexts/NotContext.jsx";
import { AuthContextProvider } from "../contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <NotContextProvider>
      <App />
    </NotContextProvider>
  </AuthContextProvider>
);
