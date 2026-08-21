import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EcosistemaPage from './pages/EcosistemaPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EcosistemaPage />
  </StrictMode>,
)
