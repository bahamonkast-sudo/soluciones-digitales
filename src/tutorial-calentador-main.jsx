import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import TutorialCalentadorPage from './pages/TutorialCalentadorPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider><React.StrictMode>
    <TutorialCalentadorPage />
  </React.StrictMode></HelmetProvider>,
)