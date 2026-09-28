import React from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import PoliticaPrivacidadPage from './pages/PoliticaPrivacidadPage.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider><React.StrictMode>
    <PoliticaPrivacidadPage />
  </React.StrictMode></HelmetProvider>
)
