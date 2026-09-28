import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import AutoPublisherPage from './pages/AutoPublisherPage.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider><StrictMode>
    <AutoPublisherPage />
  </StrictMode></HelmetProvider>,
)
