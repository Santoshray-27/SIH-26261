import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

// Self-hosted fonts via @fontsource as per design-system.md
import '@fontsource/fraunces/index.css';
import '@fontsource/fraunces/700.css';
import '@fontsource/fraunces/900.css';
import '@fontsource/fraunces/400-italic.css';
import '@fontsource/geist-sans';
import '@fontsource/jetbrains-mono';
import '@fontsource/noto-serif-devanagari';
import '@fontsource/noto-sans-devanagari';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
