import React from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import AuditorSitioWebPage from './pages/AuditorSitioWebPage.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider><React.StrictMode>
    <AuditorSitioWebPage />
  </React.StrictMode></HelmetProvider>
)
