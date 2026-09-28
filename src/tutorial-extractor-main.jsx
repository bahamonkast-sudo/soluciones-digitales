import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import TutorialExtractorPage from './pages/TutorialExtractorPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider><React.StrictMode>
    <TutorialExtractorPage />
  </React.StrictMode></HelmetProvider>,
)
