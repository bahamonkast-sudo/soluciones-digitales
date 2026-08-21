import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TutorialGuardianDifusionPage from './pages/TutorialGuardianDifusionPage.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TutorialGuardianDifusionPage />
  </React.StrictMode>
)
