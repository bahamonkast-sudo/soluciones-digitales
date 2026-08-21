import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Canal1ChatbotPage from './pages/Canal1ChatbotPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Canal1ChatbotPage />
  </StrictMode>,
)
