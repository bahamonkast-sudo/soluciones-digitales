import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AutoPublisherPage from './pages/AutoPublisherPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AutoPublisherPage />
  </StrictMode>,
)
