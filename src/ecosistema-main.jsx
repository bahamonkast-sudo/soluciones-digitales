import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import EcosistemaPage from './pages/EcosistemaPage.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider><StrictMode>
    <EcosistemaPage />
  </StrictMode></HelmetProvider>,
)
