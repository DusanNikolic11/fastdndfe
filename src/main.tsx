import "./main.css";
import "@fontsource/kreon";
import "@fontsource/kreon/300.css";
import "@fontsource/kreon/400.css";
import "@fontsource/kreon/500.css";
import "@fontsource/kreon/600.css";
import "@fontsource/kreon/700.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
