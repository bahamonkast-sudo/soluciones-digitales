import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import Canal1ChatbotPage from './pages/Canal1ChatbotPage.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider><StrictMode>
    <Canal1ChatbotPage />
  </StrictMode></HelmetProvider>,
)
