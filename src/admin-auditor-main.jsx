import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdminAuditorPage from './pages/AdminAuditorPage.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminAuditorPage />
  </React.StrictMode>
)
