import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import TuConsultorPage from './pages/TuConsultorPage.jsx';

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <StrictMode><TuConsultorPage /></StrictMode>
  </HelmetProvider>,
);
