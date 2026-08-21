import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProductosPage from './pages/ProductosPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductosPage />
  </StrictMode>,
)
