

import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Modal from "react-modal";
import App from './App.jsx'
import './index.css'
// Set the app element
Modal.setAppElement("#root");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
