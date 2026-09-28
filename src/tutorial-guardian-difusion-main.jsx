import React from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import TutorialGuardianDifusionPage from './pages/TutorialGuardianDifusionPage.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider><React.StrictMode>
    <TutorialGuardianDifusionPage />
  </React.StrictMode></HelmetProvider>
)
