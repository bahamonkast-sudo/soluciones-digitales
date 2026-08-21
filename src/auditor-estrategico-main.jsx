import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuditorEstrategicoPage from './pages/AuditorEstrategicoPage.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuditorEstrategicoPage />
  </React.StrictMode>
)
