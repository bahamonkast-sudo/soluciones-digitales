import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GuardianDifusionPage from './pages/GuardianDifusionPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GuardianDifusionPage />
  </StrictMode>,
)
