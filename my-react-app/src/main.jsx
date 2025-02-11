import React from "react";
import ReactDOM from "react-dom/client"; // Import from "react-dom/client"
import App from "./App";
import reportWebVitals from "./ReportWebVitals";
import { Provider } from "react-redux";
import { store } from "./app/Store";
import './styles/index.css';
// Get the root element
const rootElement = document.getElementById("root");

// Create a root for React 18
const root = ReactDOM.createRoot(rootElement);

// Render the app using createRoot
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
