import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FanpageEnvioMasivoPage from './pages/FanpageEnvioMasivoPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FanpageEnvioMasivoPage />
  </StrictMode>,
)
