import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import FanpageEnvioMasivoPage from './pages/FanpageEnvioMasivoPage.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider><StrictMode>
    <FanpageEnvioMasivoPage />
  </StrictMode></HelmetProvider>,
)
