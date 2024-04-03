import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplayData from './DisplayData.jsx';
const muitheme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={muitheme}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/category-list/:itemCode" element={<DisplayData />} />
      </Routes>
    </Router>
    </ThemeProvider>
  </React.StrictMode>,
)
