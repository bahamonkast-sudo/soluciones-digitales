import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TarjetaDigitalPage from './components/digital-card/TarjetaDigitalPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TarjetaDigitalPage />
  </StrictMode>,
)
