import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SolucionesDigitalesPage from './pages/SolucionesDigitalesPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SolucionesDigitalesPage />
  </StrictMode>,
)
