import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { HashRouter as Router } from 'react-router-dom'; 
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')!;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Router  basename={process.env.NODE_ENV === 'development' ? '/' : '/react-movie-database/'}>
    <App />
    </Router>
  </React.StrictMode>,
)
