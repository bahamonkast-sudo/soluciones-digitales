import React from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import TutorialIAPage from './pages/TutorialIAPage.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider><React.StrictMode>
    <TutorialIAPage />
  </React.StrictMode></HelmetProvider>
)
