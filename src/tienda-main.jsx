import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import TiendaPage from './pages/TiendaPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider><React.StrictMode>
    <TiendaPage />
  </React.StrictMode></HelmetProvider>,
)
