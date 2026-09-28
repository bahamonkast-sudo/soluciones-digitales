import React from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import AuditorEstrategicoPage from './pages/AuditorEstrategicoPage.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider><React.StrictMode>
    <AuditorEstrategicoPage />
  </React.StrictMode></HelmetProvider>
)
