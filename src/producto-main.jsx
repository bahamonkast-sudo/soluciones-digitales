import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import ProductoPage from './pages/ProductoPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider><React.StrictMode>
    <ProductoPage />
  </React.StrictMode></HelmetProvider>,
)
