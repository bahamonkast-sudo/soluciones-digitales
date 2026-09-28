import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import GuardianDifusionPage from './pages/GuardianDifusionPage.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider><StrictMode>
    <GuardianDifusionPage />
  </StrictMode></HelmetProvider>,
)
