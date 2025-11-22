import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from '@chakra-ui/react';
import App from './App.jsx';
import './styles.css';

// Define config with tokens using the v3 approach
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        neon: {
          50: { value: '#E9F5FF' },
          100: { value: '#BEE3F8' },
          200: { value: '#90CDF4' },
          300: { value: '#63B3ED' },
          400: { value: '#4299E1' },
          500: { value: '#3182CE' },
          600: { value: '#2B6CB0' },
          700: { value: '#2C5282' },
          800: { value: '#1A365D' },
          900: { value: '#102A43' },
        },
        miami: {
          pink: { value: '#FF6EC7' },
          teal: { value: '#38E8D0' },
          purple: { value: '#8A6FF9' },
          blue: { value: '#4FD1C5' },
        },
      },
      fonts: {
        heading: { value: 'Orbitron, system-ui, sans-serif' },
        body: { value: 'Inter, system-ui, sans-serif' },
      },
    },
    semanticTokens: {
      colors: {
        bg: { value: '#030016' },
        text: { value: '#E2E8F0' },
      },
    },
    styles: {
      global: {
        body: {
          bg: 'bg',
          color: 'text',
        },
      },
    },
  },
});

// Create the system
const system = createSystem(defaultConfig, config);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
