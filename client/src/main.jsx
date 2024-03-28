import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Home.jsx'
import { ChakraProvider } from '@chakra-ui/react';
import './index.css'
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import theme from './components/reusable-assets/theme.js'
import { BrowserRouter as Router } from 'react-router-dom';



const muitheme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <ChakraProvider theme={theme}>
      <ThemeProvider theme={muitheme}>
        <App />
      </ThemeProvider>
    </ChakraProvider>
    </Router>
  </React.StrictMode>,
)
