import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { HashRouter as Router } from 'react-router-dom'; 
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')!;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Router>
    <App />
    </Router>
  </React.StrictMode>,
)
