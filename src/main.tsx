import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n/config';
import { App } from './App';
import './index.css';

// Self-hosted fonts via @fontsource (subsets: latin + devanagari only, font-display: swap)
import '@fontsource/public-sans/latin-400.css';
import '@fontsource/public-sans/latin-500.css';
import '@fontsource/public-sans/latin-600.css';
import '@fontsource/public-sans/latin-700.css';
import '@fontsource/merriweather/latin-400.css';
import '@fontsource/merriweather/latin-700.css';
import '@fontsource/roboto-mono/latin-400.css';
import '@fontsource/roboto-mono/latin-500.css';
import '@fontsource/noto-serif-devanagari';
import '@fontsource/noto-sans-devanagari';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
