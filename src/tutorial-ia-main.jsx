import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TutorialIAPage from './pages/TutorialIAPage.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TutorialIAPage />
  </React.StrictMode>
)
