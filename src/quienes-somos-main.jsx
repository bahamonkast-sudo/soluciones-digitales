import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import QuienesSomosPage from './pages/QuienesSomosPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuienesSomosPage />
  </StrictMode>,
)
