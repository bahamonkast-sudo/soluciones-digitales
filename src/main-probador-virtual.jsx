import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import ProbadorVirtualPage from './pages/ProbadorVirtualPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider><React.StrictMode>
    <ProbadorVirtualPage />
  </React.StrictMode></HelmetProvider>,
)
