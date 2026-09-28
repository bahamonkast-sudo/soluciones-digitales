import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import QuienesSomosPage from './pages/QuienesSomosPage.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider><StrictMode>
    <QuienesSomosPage />
  </StrictMode></HelmetProvider>,
)
