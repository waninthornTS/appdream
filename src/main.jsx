import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/mali/400.css'
import '@fontsource/mali/600.css'
import '@fontsource/mali/700.css'
import './styles.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
