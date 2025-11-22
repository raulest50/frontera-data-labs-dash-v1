import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react';
import App from './App.jsx';
import './styles.css';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: '#030016',
        color: '#E2E8F0',
      },
    },
  },
  fonts: {
    heading: 'Orbitron, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  colors: {
    neon: {
      50: '#E9F5FF',
      100: '#BEE3F8',
      200: '#90CDF4',
      300: '#63B3ED',
      400: '#4299E1',
      500: '#3182CE',
      600: '#2B6CB0',
      700: '#2C5282',
      800: '#1A365D',
      900: '#102A43',
    },
    miami: {
      pink: '#FF6EC7',
      teal: '#38E8D0',
      purple: '#8A6FF9',
      blue: '#4FD1C5',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
