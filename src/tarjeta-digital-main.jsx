import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import TarjetaDigitalPage from './components/digital-card/TarjetaDigitalPage.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider><StrictMode>
    <TarjetaDigitalPage />
  </StrictMode></HelmetProvider>,
)
