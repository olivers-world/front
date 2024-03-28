import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import PageWrapper from "./components/ui/pagewrapper.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PageWrapper>
          <App />
        </PageWrapper>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
