import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const isChrome = /Chrome/.test(navigator.userAgent) && !/Edg|OPR|Brave/.test(navigator.userAgent)

if (isChrome) {
  document.documentElement.classList.add('ua-chrome')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
