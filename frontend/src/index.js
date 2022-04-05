import { createRoot } from "react-dom/client";
import React from "react";
import "./styles/styles.css";
import App from "./App";

createRoot(document.getElementById("root")).render(<App tab="home" />);
