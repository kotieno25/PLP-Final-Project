import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// Google Analytics integration
import ReactGA from "react-ga4";

// TODO: Replace with your real GA4 Measurement ID
ReactGA.initialize("G-XXXXXXXXXX");
ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
