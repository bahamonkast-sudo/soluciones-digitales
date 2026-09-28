import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import ChatbotPage from './pages/ChatbotPage.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider><StrictMode>
    <ChatbotPage />
  </StrictMode></HelmetProvider>,
)
