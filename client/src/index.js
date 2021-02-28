import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import { init } from "emailjs-com";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
init("user_OCDvSu6Pyxz7Gwe93vE8N");

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
