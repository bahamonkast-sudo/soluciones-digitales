import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ChatbotPage from './pages/ChatbotPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatbotPage />
  </StrictMode>,
)
