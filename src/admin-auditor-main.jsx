import React from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import AdminAuditorPage from './pages/AdminAuditorPage.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider><React.StrictMode>
    <AdminAuditorPage />
  </React.StrictMode></HelmetProvider>
)
