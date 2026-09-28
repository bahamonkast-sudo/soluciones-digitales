import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import SitiosWebPage from './pages/SitiosWebPage.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider><StrictMode>
    <SitiosWebPage />
  </StrictMode></HelmetProvider>,
)
