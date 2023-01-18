import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";

const dom = document.getElementById("root");
createRoot(dom).render(<App></App>);